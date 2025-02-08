import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules fixes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// In-memory user store
const users = new Map();

// Initialize default user
const initializeUsers = async () => {
    try {
        const hashedPassword = await bcrypt.hash('GTM2024#User', 10);
        users.set('user930@gmail.com', {
            password: hashedPassword,
            name: 'User'
        });
        console.log('Default user initialized');
    } catch (error) {
        console.error('Error initializing users:', error);
    }
};

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.get(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email, name: user.name },
            'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { email, name: user.name }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

// Protected route example
app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
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
    });
});
