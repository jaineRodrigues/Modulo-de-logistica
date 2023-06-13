const express = require('express');
const router = express.Router();
const TransportadoraController = require('../controllers/transportadoraController');

router.post('/register', TransportadoraController.register);
router.post('/delete/:id', TransportadoraController.delete);
router.post('/edit/:id', TransportadoraController.edit);

module.exports = router;