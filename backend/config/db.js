const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_invex',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de connexion
db.getConnection()
  .then(conn => {
    console.log('Connecté à MySQL avec succès');
    conn.release();
  })
  .catch(err => {
    console.error('Erreur de connexion à MySQL:', err);
  });

module.exports = db;