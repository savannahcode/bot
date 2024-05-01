const { SlashCommandBuilder } = require('discord.js')

let apiUrl = `https://icanhazdadjoke.com/`

async function getJoke() {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  })
  const data = await response.json()
  return data
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Gives a Dad joke'),
  async execute(interaction) {
    try {
      const jokeData = await getJoke()
      await interaction.reply(`Dad joke:\n\n${jokeData.joke}`)
    } catch (error) {
      console.log('Error:', error)
      await interaction.reply('Failed to fetch dad joke data.')
    }
  },
}
