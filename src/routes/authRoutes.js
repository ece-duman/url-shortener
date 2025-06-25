const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);  // register rotası eklendi
router.post('/login', authController.login);

module.exports = router;


