require ('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL Connected....');
});

// Endpoint to save data
app.post('/save', (req, res) => {
    const { username, number, email, payement, date } = req.body;
    const sql = 'INSERT INTO purchases (username, number, email, payement, date) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [username, number, email, payement, date], (err, result) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data: ' + err.message);
        } else {
            res.send('Data saved');
        }
    });
});

// Endpoint to get all purchases
app.get('/save', (req, res) => {
    const sql = 'SELECT * FROM purchases';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data: ' + err.message);
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
