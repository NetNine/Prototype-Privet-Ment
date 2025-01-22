const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// In-memory stores
const users = new Map();
const otpStore = new Map();

// Email configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
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
        console.log('Login credentials:');
        console.log('Email: user930@gmail.com');
        console.log('Password:', process.env.INITIAL_PASSWORD || 'GTM2024#User');
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
        if (process.env.NODE_ENV !== 'production') {
            console.log('Development Mode: OTP for testing:', otp);
            return;
        }

        await transporter.sendMail({
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
        });
        
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Failed to send OTP:', error);
        throw new Error('Failed to send verification code');
    }
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Initial password verification
app.post('/api/verify-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Password verification attempt for:', email);

        const user = users.get(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
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
            if (process.env.NODE_ENV !== 'production') {
                res.json({ 
                    message: 'Development mode: Check server console for OTP',
                    devOtp: otp // Only sent in development
                });
            } else {
                res.json({ message: 'Verification code sent to admin email' });
            }
        } catch (error) {
            console.error('Failed to send OTP:', error);
            // In development, still allow login with OTP
            if (process.env.NODE_ENV !== 'production') {
                res.json({ 
                    message: 'Development mode: Check server console for OTP',
                    devOtp: otp // Only sent in development
                });
            } else {
                res.status(500).json({ 
                    message: 'Failed to send verification code. Please try again.',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
        }
    } catch (error) {
        console.error('Password verification error:', error);
        res.status(500).json({ message: 'An error occurred during verification' });
    }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log('OTP verification attempt for:', email);

        const otpData = otpStore.get(email);
        if (!otpData) {
            return res.status(400).json({ message: 'Please request a new verification code' });
        }

        // Check if OTP is expired (5 minutes)
        if (Date.now() - otpData.timestamp > 5 * 60 * 1000) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'Verification code expired. Please request a new one.' });
        }

        // Check attempts
        if (otpData.attempts >= 3) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'Too many attempts. Please request a new verification code.' });
        }

        // Verify OTP
        if (otpData.otp !== otp) {
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
    try {
        const { email } = req.body;
        console.log('Resend OTP request for:', email);

        if (!users.has(email)) {
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
            res.json({ message: 'New verification code sent to admin email' });
        } catch (error) {
            console.error('Failed to send OTP:', error);
            res.status(500).json({ 
                message: 'Failed to send verification code. Please check email configuration.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Protected routes
app.get('/resources', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'resources.html'));
});

app.get('/contact', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Initialize users and start server
initializeUsers().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Visit http://localhost:${PORT} to access the website`);
    });
});
