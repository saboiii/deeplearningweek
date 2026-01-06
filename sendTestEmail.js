require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('Starting DLW 2026 test email script...');
const testName = 'Saba Azad';
const testEmail = 'saba.x.azad@gmail.com';
const htmlPath = path.join(__dirname, 'app', 'api', 'submit', 'dlw-confirmation-2026.html');
console.log('Attempting to read HTML template at:', htmlPath);
let htmlContent = '';
try {
  htmlContent = fs.readFileSync(htmlPath, 'utf8');
  console.log('HTML template loaded.');
} catch (err) {
  console.error('Error reading HTML template:', err);
  process.exit(1);
}

htmlContent = htmlContent.replace(/\$\{toName\}/g, testName);

const imageUrl = 'https://www.dlweek.com/images/banner-conf-email.png';
htmlContent = htmlContent.replace(/<img([^>]+)src="data:image\/png;base64,[^"]+"/g, `<img$1src="${imageUrl}"`);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: 'deeplearningweek@gmail.com',
  to: testEmail,
  subject: 'you’re in. dlw 2026 registration confirmed',
  html: htmlContent,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending test confirmation email:', error);
  }
  console.log('Test confirmation email sent:', info.response);
});
