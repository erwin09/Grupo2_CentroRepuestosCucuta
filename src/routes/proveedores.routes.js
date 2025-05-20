const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');

router.post('/', proveedoresController.createProveedor);
router.get('/', proveedoresController.getAllProveedores);
router.get('/:id', proveedoresController.getProveedorById);
router.put('/:id', proveedoresController.updateProveedor);

module.exports = router;