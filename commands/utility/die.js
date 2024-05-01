const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('die')
    .setDescription('Kills the bot.'),
  async execute(interaction) {
    await interaction.reply('Goodbye!')
    process.exit()
  },
}
