const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3000;

const path = require('path');

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname)));

// Middleware to read data from HTML form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!#G43(m*Sd$x!',
  database: 'myservice', // Change this to your actual database name
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to the database!');
  }
});

// Handle login request
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM `user` WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      // Successful login, respond with success
      res.json({});
    } else {
      // Failed login, send error message
      res.json({ message: 'Email atau password salah.' });
    }
  });
});

// Handle signup request
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Check if email already exists
    const checkQuery = 'SELECT * FROM `user` WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            // If email exists, send an error message
            return res.json({ message: 'Email sudah terdaftar.' });
        }

        // Insert new user into the database (using only username, email, and password)
        const insertQuery = 'INSERT INTO `user` (username, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, email, password], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Successful signup
            res.json({ success: true });
        });
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
