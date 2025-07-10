const express = require('express');
const router = express.Router();
const detalleProductoController = require('../controllers/detalle_producto.controller');

router.post('/', detalleProductoController.createDetalleProducto);
router.get('/', detalleProductoController.getAllDetalleProducto);
router.get('/:id', detalleProductoController.getDetalleProductoById);
router.put('/:id/:id2', detalleProductoController.updateDetalleProducto);

module.exports = router;