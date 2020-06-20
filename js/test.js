const params = {
  score: {
    health: 80
  },
  options: {
    is_awakened: true
  },
  arr: [{a:1}, {a:2}]
}

const fn = ({ score, options }) => {
  if (options.is_awakened) {
    score.health += 10
  }
}

console.log('before', params)
fn(params)
console.log('after', params)

params.arr.forEach(e => e.a += 1)
console.log(params.arr)
