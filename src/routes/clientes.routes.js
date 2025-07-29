// src/routes/clientes.routes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');


// Rutas para manejar clientes
router.post('/', clientesController.createCliente);
router.get('/', clientesController.getAllClientes);
router.post('/recuperar/verificar', clientesController.recuperarContrasena);
router.post('/recuperar/enviar', clientesController.enviarCodigoRecuperacion);
router.get('/:id', clientesController.getClienteById);
router.put('/:id', clientesController.updateCliente);
router.delete('/:id', clientesController.deleteCliente);

module.exports = router;
