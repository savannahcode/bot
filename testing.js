require('dotenv').config()
const nodemailer = require('nodemailer')

console.log(process.env.EMAIL)
console.log(process.env.EMAIL_PASSWORD)
async function sendTestEmail() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.com', // Adjust as per your email provider
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: 'your-test-email@example.com', // Change to your verification email
      subject: 'Test Email',
      text: 'This is a test email from my Node.js application.',
    })

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

sendTestEmail()
