const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');


router.post('/', vehiculosController.createVehiculo);

module.exports = router;
