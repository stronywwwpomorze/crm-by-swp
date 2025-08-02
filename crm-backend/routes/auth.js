const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) return res.status(401).json({ message: 'Nieprawidłowy email' });

  console.log('Wysłane hasło:', password);
  console.log('Hash z bazy:', user.password);  

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Nieprawidłowe hasło' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });

  res.json({ token });
});

module.exports = router;
