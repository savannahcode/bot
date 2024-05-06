require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')
const nodemailer = require('nodemailer')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('email')
    .setDescription('Send an email.')
    .addStringOption((option) =>
      option
        .setName('email')
        .setDescription('Enter the email to send a message to')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Enter the message to send')
        .setRequired(true)
    ),
  async execute(interaction) {
    const userEmail = interaction.options.getString('email')
    const message = interaction.options.getString('message')

    // Create a Nodemailer transporter using SMTP (adjust as needed)

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      text: message,
      subject: 'Message from Discord bot',
    }

    // Send the email
    nodemailer
      .createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
      })
      .sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          interaction.reply('Failed to send email.')
        } else {
          console.log('Email sent: ' + info.response)
          interaction.reply('Email sent')
        }
      })
  },
}
