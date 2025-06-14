// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
// const db = require('../config/db'); // ta connexion MySQL
const authController = require('../controllers/authController');

// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   db.query(sql, [email, password], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Erreur serveur' });
//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Identifiants incorrects' });
//     }

//     res.json({ message: 'Login successful' }); // tu pourrais renvoyer un token ici aussi
//   });
// });

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
