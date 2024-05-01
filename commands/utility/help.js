const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(
      'Replies with various commands that can be given to the bot.'
    ),
  async execute(interaction) {
    await interaction.reply(
      'Here are the commands that you can give to the bot:\n\n/help (displays a helpful summary of commands)\n\n/lorem (produces lorem ipsum words)\n\n/dadjoke (tells a random dad joke)\n\n/die (kills your bot)\n\n/text (sends a text message to a phone number)\n\n/email (sends email)\n\n/music (streams music remotely)\n\n/weather (gives local weather blurb)'
    )
  },
}
