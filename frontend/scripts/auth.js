const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // or session management
const router = express.Router();
const db = require('./database'); // your DB connection

// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // 1. Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 2. Check if user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // 3. Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Create user in database
        const newUser = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [fullName, email, phone || null, hashedPassword]
        );

        // 5. Return success (DO NOT automatically login)
        res.status(201).json({ 
            message: 'Registration successful', 
            userId: newUser.insertId 
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // 3. Create session/JWT only after successful auth
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Return token/session info
        res.json({ 
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;