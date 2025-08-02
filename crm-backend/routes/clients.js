const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// Middleware autoryzacji
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

// Lista klientów
router.get('/', verifyToken, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
  res.json(rows);
});

// Dodaj klienta
router.post('/', verifyToken, async (req, res) => {
  const { client_number, name } = req.body;

  if (!client_number || !name) {
    return res.status(400).json({ message: 'Brakuje danych' });
  }

  await pool.query('INSERT INTO clients (client_number, name) VALUES (?, ?)', [client_number, name]);
  res.json({ message: 'Klient dodany' });
});

// Pobieranie listy klientów
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clients');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera przy pobieraniu klientów' });
  }
});


module.exports = router;
