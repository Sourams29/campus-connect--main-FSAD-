const express = require('express');
const router = express.Router();
const emailController = require('../Controllers/emailController');

// POST route for sending email
router.post('/send-email', emailController.sendEmail);

module.exports = router;
