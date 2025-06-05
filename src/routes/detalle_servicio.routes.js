const express = require('express');
const router = express.Router();
const detalleServicioController = require('../controllers/detalle_servicio.controller');

router.post('/', detalleServicioController.createDetalleServicio);
router.get('/', detalleServicioController.getAllDetalleServicio);
router.get('/:id1/:id2', detalleServicioController.getDetalleServicioById);
router.put('/:id/:id2', detalleServicioController.updateDetalleServicio);

module.exports = router;