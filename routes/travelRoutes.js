const express = require('express');
const travelController = require('../controllers/travelController');
const router = express.Router();

router.post('/travelRegistration', travelController.travelRegistration);

module.exports = router;
