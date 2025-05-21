const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');

router.post('/', productoController.createProducto);
router.get('/', productoController.getAllProductos);
router.get('/:id', productoController.getProductoById);
router.put('/:id', productoController.updateProducto);

module.exports = router;