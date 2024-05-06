require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')
const nodemailer = require('nodemailer')

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
        .setDescription('The carrier of the phone number.')
        .setRequired(true)
        .addChoices(
          { name: 'ATT', value: 'att' },
          { name: 'Verizon', value: 'verizon' },
          { name: 'T-Mobile', value: 'tmobile' },
          { name: 'Sprint', value: 'sprint' },
          { name: 'Boost Mobile', value: 'boost mobile' },
          { name: 'Cricket Wireless', value: 'cricket wireless' },
          { name: 'Google Fi', value: 'google fi' },
          { name: 'Metropcs', value: 'metropcs' },
          { name: 'US Cellular', value: 'us cellular' },
          { name: 'Virgin Mobile', value: 'virgin mobile' }
        )
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
    switch (carrier) {
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

    // Define the email options
    const mailOptions = {
      from: 'salmon.sav@gmail.com',
      to: `${phoneNumber}${carrierDomain}`,
      text: message,
    }

    // Send the email
    nodemailer
      .createTransport({
        service: 'gmail',
        auth: { user: 'salmon.sav@gmail.com', pass: 'qtnn omrd nofe vvkn' },
      })
      .sendMail(mailOptions, function (error, info) {
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
