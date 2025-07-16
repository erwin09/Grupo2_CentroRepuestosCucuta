const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citas.controller');

router.post('/', citasController.createCita);
router.get('/', citasController.getAllCitas);
router.get('/usuario/:id', citasController.getCitaByIdClient);
router.get('/nuevoId',citasController.getNuevoId);
router.get('/:id', citasController.getCitaById);
router.put('/:id', citasController.updateCita);

module.exports = router;