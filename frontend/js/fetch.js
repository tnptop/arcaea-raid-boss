const API_KEY = '5LE1IHsZj4l1fw83muUrPnHjGqQTO4GxUKwwz7TzXwkaiMd830dykg=='
const BASE_URL = 'https://arcaea.tnptop.com/raid/api'

async function getActiveBossInfo () {
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    }
  }
  const rawResponse = await fetch(`${BASE_URL}/bosses/active`, options)
  const response = await rawResponse.json()

  if (response.err) throw response.err
  else return Object.assign(
    {},
    response.boss,
    {
      percentHealth: Math.floor(response.boss.health * 100 / response.boss.maxHealth)
    }
  )
}

async function attack (attackParams) {
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attackParams)
  }
  const rawResponse = await fetch(`${BASE_URL}/attack`, options)
  const response = rawResponse.json()

  if (response.err) throw response.err
  else return response.attack
}
