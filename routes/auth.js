const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register )
router.post('/login', authController.login )

router.post('/clientPanel', authController.clientPanel);
router.post('/adminPanel', authController.adminPanel);

module.exports = router;
