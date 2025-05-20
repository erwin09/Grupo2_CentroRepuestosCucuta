const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');

router.post('/', serviciosController.createServicio);
router.get('/', serviciosController.getAllServicios);
router.get('/:id', serviciosController.getServicioById);
router.put('/:id', serviciosController.updateServicio);

module.exports = router;