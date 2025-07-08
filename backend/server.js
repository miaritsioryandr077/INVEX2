const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5002;

// Middleware
app.use(cors({
  origin: 'http://localhost:3002', // URL du frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'] 
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', productRoutes);
app.use('/api', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ status: "Backend fonctionnel" });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});