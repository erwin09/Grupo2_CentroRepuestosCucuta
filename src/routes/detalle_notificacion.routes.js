const express = require('express');
const router = express.Router();
const detalleNotificacionController = require('../controllers/detalle_notificacion.controller');

router.post('/', detalleNotificacionController.createDetalleNotificacion);
router.get('/', detalleNotificacionController.getAllDetalleNotificacion);
router.get('/:id1/:id2', detalleNotificacionController.getDetalleNotificacionById);
router.put('/:id/:id2', detalleNotificacionController.updateDetalleNotificacion);

module.exports = router;