const express = require('express');
const router = express.Router();
const historialesController = require('../controllers/historiales.controller');

router.post('/', historialesController.createHistorial);
router.get('/', historialesController.getAllHistorial);
router.get('/:id', historialesController.getHistorialById);
router.put('/:id', historialesController.updateHistorial);

module.exports = router;