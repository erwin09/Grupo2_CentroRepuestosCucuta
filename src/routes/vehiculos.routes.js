const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');


router.post('/', vehiculosController.createVehiculo);
router.get('/', vehiculosController.getAllVehiculos);
router.get('/:id', vehiculosController.getVehiculoByPlaca);
router.put('/:id', vehiculosController.updateVehiculo);

module.exports = router;
