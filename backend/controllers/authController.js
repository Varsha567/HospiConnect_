const db = require('../db');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.execute(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid username or password' });
            }

            res.json({ success: true, message: 'Login successful' });
        });
    });
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.execute(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Registration failed', error: err });
        }

        res.json({ success: true, message: 'Registration successful' });
    });
};

module.exports = { login, register };