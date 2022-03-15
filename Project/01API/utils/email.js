const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1)creste a transporter
  const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: porcess.env.EMAIL_POER,
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
    subjects: options.subject,
    text: options.message,
    // html: 
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail