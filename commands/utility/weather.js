const { SlashCommandBuilder } = require('discord.js')
require('dotenv').config()
//const fetch = require('node-fetch')

async function getWeatherData(zipcode) {
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${process.env.WEATHER_API_KEY}`
  const response = await fetch(weatherApiUrl)
  const data = await response.json()
  return data
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Gives local weather blurb')
    .addStringOption((option) =>
      option
        .setName('zipcode')
        .setDescription('Enter your zip code')
        .setRequired(true)
    ),
  async execute(interaction) {
    const zipcode = interaction.options.getString('zipcode')
    try {
      const weatherData = await getWeatherData(zipcode)
      await interaction.reply(
        `Weather:\n\nIt's ${weatherData.main.temp}°F in ${weatherData.name}, but feels like ${weatherData.main.feels_like}°F.`
      )
    } catch (error) {
      console.log('Error:', error)
      await interaction.reply('Failed to fetch weather data.')
    }
  },
}
