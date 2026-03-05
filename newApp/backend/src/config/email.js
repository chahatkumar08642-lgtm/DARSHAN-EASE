const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!process.env.EMAIL_HOST) {
    console.warn('EMAIL_HOST not set. Email sending will be logged only.');
    transporter = null;
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  return transporter;
};

const sendEmail = async ({ to, subject, html }) => {
  const from = process.env.EMAIL_FROM || 'Darshan Ease <no-reply@darshanease.com>';
  const mailOptions = { from, to, subject, html };

  const t = getTransporter();
  if (!t) {
    console.log('Email transport not configured. Email content:', mailOptions);
    return;
  }

  await t.sendMail(mailOptions);
};

module.exports = {
  sendEmail
};

