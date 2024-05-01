require('dotenv').config()

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

getJoke()
  .then((data) => {
    // You can use the data here
    console.log(data)
  })
  .catch((error) => console.log('Error:', error))
