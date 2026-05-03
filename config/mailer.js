require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // From the .env file
        pass: process.env.EMAIL_PASS 
    }
});

module.exports = transporter;
