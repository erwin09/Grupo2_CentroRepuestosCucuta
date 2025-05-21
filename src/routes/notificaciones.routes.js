const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificaciones.controller');

router.post('/', notificacionesController.createNotificacion);
router.get('/', notificacionesController.getAllNotificaciones);
router.get('/:id', notificacionesController.getNotificacionById);
router.put('/:id', notificacionesController.updateNotificacion);

module.exports = router;