const db = require('../config/db');

// AJOUTER UN PRODUIT
exports.addProduct = async (req, res) => {
  try {
    const { numProduit, design, prix, quantite } = req.body;
    
    // Validation
    if (!numProduit || !design || !prix || !quantite) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const [result] = await db.execute(
      'INSERT INTO Produit (numProduit, design, prix, quantite) VALUES (?, ?, ?, ?)',
      [numProduit, design, prix, quantite]
    );

    res.status(201).json({ 
      success: true,
      message: "Insertion réussie !"
    });
  } catch (error) {
    console.error("Erreur MySQL:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// RECUPERER TOUS LES PRODUITS
exports.getAllProducts = async (req, res) => {
    try {
      const [products] = await db.execute(
        'SELECT numProduit, design, prix, quantite, (prix * quantite) AS montant FROM Produit'
      );
      
      // Conversion des champs numériques
      const formattedProducts = products.map(product => ({
        ...product,
        prix: Number(product.prix),
        quantite: Number(product.quantite),
        montant: Number(product.montant)
      }));
      
      res.json(formattedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  };
  

// SUPPRIMER UN PRODUIT
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute(
      'DELETE FROM Produit WHERE numProduit = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    
    res.json({ success: true, message: "Suppression réussie !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// METTRE A JOUR UN PRODUIT
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { design, prix, quantite } = req.body;
    
    const [result] = await db.execute(
      'UPDATE Produit SET design = ?, prix = ?, quantite = ? WHERE numProduit = ?',
      [design, prix, quantite, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    
    res.json({ success: true, message: "Modification réussie !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// STATISTIQUES
exports.getProductsStats = async (req, res) => {
  try {
    const [products] = await db.execute(
      'SELECT numProduit, design, prix, quantite FROM Produit'
    );

    const validProducts = products
      .filter(p => !isNaN(p.prix) && !isNaN(p.quantite))
      .map(p => {
        const prix = parseFloat(p.prix);
        const quantite = parseInt(p.quantite, 10);
        return {
          ...p,
          prix,
          quantite,
          montant: prix * quantite
        };
      });

    const amounts = validProducts.map(p => p.montant);
    const stats = {
      min: Math.min(...amounts),
      max: Math.max(...amounts),
      total: amounts.reduce((sum, amount) => sum + amount, 0),
      count: validProducts.length
    };

    res.json({
      ...stats,
      products: validProducts
    });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};