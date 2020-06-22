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
  const { boss } = await rawResponse.json()

  if (boss.err) throw boss.err
  else return Object.assign(
    {},
    boss,
    {
      percentHealth: Math.floor(boss.health * 100 / boss.maxHealth)
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
  const attack = rawResponse.json()

  if (attack.err) throw attack.err
  else return attack
}
