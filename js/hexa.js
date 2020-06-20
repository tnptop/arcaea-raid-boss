// Really, REALLY simple version of hexadiver
const rates = [1, 1.25, 1.75, 2.5, 5]
const baseDamages = [200, 500, 1000, 2000]

function getHexaDamage(difficulty, rank, isClear) {
  return baseDamages[difficulty] * (isClear ? rates[rank] : Math.floor(Math.random() / 2))
}

$('button#hexa-calc-damage').on('click', function() {
  let difficulty = Number($('#hexa-difficulty').val())
  let rank = Number($('#hexa-rank').val())
  let isClear = Number($('#hexa-clear').val())
  let damage = getHexaDamage(difficulty, rank, isClear)

  $('#hexa-damage').val(damage)
})