const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientos.controller');

router.post('/', mantenimientoController.createMantenimiento);
router.post('/crear', mantenimientoController.createMantenimientoCompleto);
router.get('/nuevo-id', mantenimientoController.getNuevoId);
router.get('/', mantenimientoController.getAllmantenimiento);
router.get('/:id', mantenimientoController.getMantenimientoById);
router.get('/:id', mantenimientoController.getMantenimientoByplaca);
router.put('/:id', mantenimientoController.updateMantenimiento);

module.exports = router;