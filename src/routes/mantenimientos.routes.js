const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/mantenimientos.controller');

router.post('/', mantenimientoController.createMantenimiento);
router.get('/', mantenimientoController.getAllmantenimiento);
router.get('/:id', mantenimientoController.getMantenimientoById);
router.put('/:id', mantenimientoController.updateMantenimiento);

module.exports = router;