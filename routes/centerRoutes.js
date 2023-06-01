const express = require('express');
const centerController = require('../controllers/centerController');
const router = express.Router();

router.post('/centerRegistration', centerController.centerRegistration );
router.post('/editCenter/:id/edit', centerController.editCenter);
router.post('/deleteCenter/:id', centerController.deleteCenter);
router.get('/deleteCenter/:id/delete', centerController.deleteCenter);

module.exports = router;
