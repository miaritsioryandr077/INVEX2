const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products', productController.getAllProducts);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/products/stats', productController.getProductsStats);

module.exports = router;