const { SlashCommandBuilder } = require('discord.js')

let apiUrl = `https://loripsum.net/api/plaintext`

async function getLorem() {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  })
  const data = await response.text()
  return data
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lorem')
    .setDescription('Gives lorem ipsum text'),
  async execute(interaction) {
    try {
      const loremData = await getLorem()
      await interaction.reply(`Lorem Ipsum text:\n\n${loremData}`)
    } catch (error) {
      console.log('Error:', error)
      await interaction.reply('Failed to fetch lorem ipsum text data.')
    }
  },
}
