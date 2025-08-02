require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const { authenticateToken } = require('./middleware/auth');


const pool = require('./db');

pool.query('SELECT 1')
  .then(() => {
    console.log('✅ Połączenie z bazą danych OK');
  })
  .catch((err) => {
    console.error('❌ Błąd połączenia z bazą danych:', err.message);
    process.exit(1); // Zatrzymaj serwer jeśli nie działa
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', authenticateToken, clientRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
