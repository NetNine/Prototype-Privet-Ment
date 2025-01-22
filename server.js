import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// ES modules fixes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://netmine.github.io',
    'https://paint-strengthened-coneflower.glitch.me',
    'https://thaviru89.github.io'
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log('Request from origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 204
};

// Basic middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// In-memory stores
const users = new Map();
const otpStore = new Map();

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Initialize default user
const initializeUsers = async () => {
    try {
        const hashedPassword = await bcrypt.hash(process.env.INITIAL_PASSWORD || 'GTM2024#User', 10);
        users.set('user930@gmail.com', {
            password: hashedPassword,
            name: 'User'
        });
        console.log('Default user initialized');
    } catch (error) {
        console.error('Error initializing users:', error);
    }
};

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email
async function sendOTP(userEmail, otp) {
    try {
        // Log OTP in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Development Mode: OTP for testing:', otp);
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to admin email
            subject: 'Login Verification Code',
            text: `Verification code for ${userEmail}: ${otp}`,
            html: `
                <h2>Login Verification Code</h2>
                <p>A login attempt was made for user: ${userEmail}</p>
                <p>Verification code: <strong>${otp}</strong></p>
                <p>This code will expire in 5 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Failed to send OTP:', error);
        throw new Error('Failed to send verification code');
    }
}

// Initial password verification
app.post('/api/verify-password', async (req, res) => {
    console.log('Password verification request received');
    try {
        const { email, password } = req.body;
        console.log('Verifying password for:', email);

        const user = users.get(email);
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('Invalid password for:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate and store OTP
        const otp = generateOTP();
        otpStore.set(email, {
            otp,
            timestamp: Date.now(),
            attempts: 0
        });

        try {
            // Send OTP
            await sendOTP(email, otp);
            
            // In development, send OTP in response
            const response = { 
                message: 'Verification code sent to admin email'
            };

            if (process.env.NODE_ENV === 'development') {
                response.devOtp = otp;
            }

            res.json(response);
        } catch (error) {
            console.error('Failed to send OTP:', error);
            res.status(500).json({ 
                message: 'Failed to send verification code. Please try again.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    } catch (error) {
        console.error('Password verification error:', error);
        res.status(500).json({ message: 'An error occurred during verification' });
    }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
    console.log('OTP verification request received');
    try {
        const { email, otp } = req.body;
        console.log('Verifying OTP for:', email);

        const otpData = otpStore.get(email);
        if (!otpData) {
            console.log('No OTP data found for:', email);
            return res.status(400).json({ message: 'Please request a new verification code' });
        }

        // Check OTP expiration (5 minutes)
        if (Date.now() - otpData.timestamp > 5 * 60 * 1000) {
            console.log('OTP expired for:', email);
            otpStore.delete(email);
            return res.status(400).json({ message: 'Verification code has expired' });
        }

        // Check attempts
        if (otpData.attempts >= 3) {
            console.log('Too many attempts for:', email);
            otpStore.delete(email);
            return res.status(400).json({ message: 'Too many invalid attempts. Please try again.' });
        }

        // Verify OTP
        if (otpData.otp !== otp) {
            console.log('Invalid OTP for:', email);
            otpData.attempts++;
            return res.status(400).json({
                message: 'Invalid verification code',
                attemptsLeft: 3 - otpData.attempts
            });
        }

        // OTP is valid, generate JWT
        const user = users.get(email);
        const token = jwt.sign(
            { email, name: user.name },
            process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production',
            { expiresIn: '24h' }
        );

        // Clear OTP data
        otpStore.delete(email);

        console.log('Login successful for:', email);
        res.json({
            message: 'Login successful',
            token,
            user: { email, name: user.name }
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'An error occurred during verification' });
    }
});

// Resend OTP
app.post('/api/resend-otp', async (req, res) => {
    console.log('Resend OTP request received');
    try {
        const { email } = req.body;
        console.log('Resending OTP for:', email);

        if (!users.has(email)) {
            console.log('Invalid email for resend:', email);
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Generate new OTP
        const otp = generateOTP();
        otpStore.set(email, {
            otp,
            timestamp: Date.now(),
            attempts: 0
        });

        try {
            // Send new OTP
            await sendOTP(email, otp);
            
            const response = { message: 'New verification code sent' };
            if (process.env.NODE_ENV === 'development') {
                response.devOtp = otp;
            }
            
            res.json(response);
        } catch (error) {
            console.error('Failed to send OTP:', error);
            res.status(500).json({ 
                message: 'Failed to send verification code',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Protected route example
app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production');
        res.json({ message: 'Access granted', user: decoded });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

// Initialize users and start server
initializeUsers().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Visit http://localhost:${PORT} to access the website`);
        console.log('Environment:', process.env.NODE_ENV);
    });
});
