const express = require('express');
const vehicleController = require('../controllers/cadveiculos');
const router = express.Router();

router.post('/register', vehicleController.register )

module.exports = router;
