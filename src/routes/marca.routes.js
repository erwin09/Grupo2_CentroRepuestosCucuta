const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcas.controller');

router.post('/', marcasController.createMarca);
router.get('/', marcasController.getAllMarca);
router.get('/:id', marcasController.getMarcaById);
router.put('/:id', marcasController.updatemarca);

module.exports = router;