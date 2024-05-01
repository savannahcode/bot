const { SlashCommandBuilder } = require('discord.js')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('text')
    .setDescription('Send a text to a number.')
    .addStringOption((option) =>
      option
        .setName('phone_number')
        .setDescription('Enter the phone number to text')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('carrier')
        .setDescription('Enter the mobile carrier')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Enter the message to send')
        .setRequired(true)
    ),
  async execute(interaction) {
    const phoneNumber = interaction.options.getString('phone_number')
    const carrier = interaction.options.getString('carrier')
    const message = interaction.options.getString('message')

    // Define the SMS gateway domain for the carrier
    let carrierDomain
    switch (carrier.toLowerCase()) {
      case 'att':
        carrierDomain = '@txt.att.net'
        break
      case 'verizon':
        carrierDomain = '@vtext.com'
        break
      case 'tmobile':
        carrierDomain = '@tmomail.net'
        break
      case 'sprint':
        carrierDomain = '@messaging.sprintpcs.net'
        break
      case 'boost mobile':
        carrierDomain = '@sms.myboostmobile.com'
        break
      case 'cricket wireless':
        carrierDomain = '@sms.cricketwireless.net'
        break
      case 'google fi':
        carrierDomain = '@msg.fi.google.com'
        break
      case 'metropcs':
        carrierDomain = '@mymetropcs.com'
        break
      case 'us cellular':
        carrierDomain = '@email.uscc.net'
        break
      case 'virgin mobile':
        carrierDomain = '@vmobl.com'
        break
      default:
        await interaction.reply('Unsupported carrier.')
        return
    }

    // Create a Nodemailer transporter using SMTP (adjust as needed)
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.com',
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.EMAIL}`, // Your email
        pass: `${process.env.EMAIL_PASSWORD}`, // Your email password
      },
    })

    // Define the email options
    const mailOptions = {
      from: `${process.env.EMAIL}`, // sender address
      to: `${phoneNumber}${carrierDomain}`, // list of receivers
      text: message, // plain text body
    }

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        interaction.reply('Failed to send text.')
      } else {
        console.log('Email sent: ' + info.response)
        interaction.reply('Text sent')
      }
    })
  },
}
