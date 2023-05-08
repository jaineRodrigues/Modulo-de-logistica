const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/register', userController.register)
router.post('/register', userController.register);

router.get('/login', userController.login)
router.post('/login', userController.login);

router.get('/changePassword', userController.changePassword)
router.post('/changePassword', userController.changePassword);

module.exports = router;
