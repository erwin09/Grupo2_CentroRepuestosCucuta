const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');

router.post('/', productoController.createProducto);
router.get('/', productoController.getAllProductos);
router.get('/tabla', productoController.getTablaProductos);
router.post('/crearcompleto', productoController.createProductoCompleto);
router.get('/:id', productoController.getProductoById);
router.put('/:id', productoController.updateProducto);
router.put('/editar-completo/:id', productoController.updateProductoCompleto);

module.exports = router;