const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');


router.post('/', vehiculosController.createVehiculo);
router.get('/', vehiculosController.getAllVehiculos);
router.get('/placa/:id', vehiculosController.getVehiculoByPlaca);
router.get('/usuario/:id', vehiculosController.getVehiculoByIdUsuario);
router.put('/:id', vehiculosController.updateVehiculo);

module.exports = router;
