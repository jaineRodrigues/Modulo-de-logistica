const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const router = express.Router();

router.post('/register', vehicleController.register )

module.exports = router;
