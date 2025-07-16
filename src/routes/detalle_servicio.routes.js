const express = require('express');
const router = express.Router();
const detalleServicioController = require('../controllers/detalle_servicio.controller');

router.post('/', detalleServicioController.createDetalleServicio);
router.get('/', detalleServicioController.getAllDetalleServicio);
router.get('/estadisticas', detalleServicioController.getAllDetalleServicioStadistic);
router.get('/:id', detalleServicioController.getDetalleServicioById);
router.put('/:id/:id2', detalleServicioController.updateDetalleServicio);

module.exports = router;