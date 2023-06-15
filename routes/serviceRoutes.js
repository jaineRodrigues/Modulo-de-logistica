const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.post('/serviceRegistration', serviceController.serviceRegistration);
router.post('/searchServices', serviceController.searchServices);

router.get('/serviceRegistration/search', serviceController.searchServices);

module.exports = router;


