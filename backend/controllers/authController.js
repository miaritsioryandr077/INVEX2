// backend/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

// INSCRIPTION UTILISATEUR
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Vérifier si l'email existe déjà
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    return res.status(201).json({
      message: 'Inscription réussie',
      user: { id: result.insertId, email }
    });

  } catch (error) {
    console.error('Erreur inscription:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};


// CONNEXION UTILISATEUR
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    return res.status(200).json({
      message: 'Connexion réussie',
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};