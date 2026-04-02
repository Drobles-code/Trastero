const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const trasteroRoutes = require('./routes/trasteros');
const authRoutes     = require('./routes/auth');
const opsRoutes      = require('./routes/ops');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/trasteros', trasteroRoutes);
app.use('/api/auth',      authRoutes);
app.use('/api/ops',       opsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor Trastero corriendo en http://localhost:${PORT}`);
});
