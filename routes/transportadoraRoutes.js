const express = require('express');
const router = express.Router();
const TransportadoraController = require('../controllers/transportadoraController');

router.post('/register', TransportadoraController.register);

module.exports = router;