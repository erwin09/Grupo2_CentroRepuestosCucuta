const express = require('express');
const router = express.Router();
const detalleMarcasController = require('../controllers/detalle_marca.controller');

router.post('/', detalleMarcasController.createDetalleMarca);
router.get('/', detalleMarcasController.getAllDetalleMarca);
router.get('/:id1/:id2', detalleMarcasController.getDetalleMarcaById);
router.put('/:id/:id2', detalleMarcasController.updateDetalleMarca);

module.exports = router;