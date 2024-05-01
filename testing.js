require('dotenv').config()
import fetch from 'node-fetch'
zipcode = '84003'

let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${process.env.WEATHER_API_KEY}`

async function getWeatherData() {
  const response = await fetch(weatherApiUrl)
  const data = await response.json()
  return data
}

getWeatherData()
  .then((data) => {
    // You can use the data here
    console.log(
      `Weather:\n\nIt's ${data.main.temp}°F in ${data.name}, but feels like ${data.main.feels_like}°F.`
    )
  })
  .catch((error) => console.log('Error:', error))
