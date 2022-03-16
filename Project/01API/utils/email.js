const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1)create a transporter
  const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: porcess.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    // Activate in gmail "less secure app" option
  });

  // 2) Define the mail option
  const mailOptions = {
    from: 'myDevTH <mydevth@hotmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html: 
  }

  // 3) Actually send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
