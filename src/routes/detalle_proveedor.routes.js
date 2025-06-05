const express = require('express');
const router = express.Router();
const detalleProveedorController = require('../controllers/detalle_proveedor.controller');

router.post('/', detalleProveedorController.createDetalleProveedor);
router.get('/', detalleProveedorController.getAllDetalleProveedor);
router.get('/:id1/:id2', detalleProveedorController.getDetalleProveedorById);
router.put('/:id/:id2', detalleProveedorController.updateDetalleProveedor);

module.exports = router;