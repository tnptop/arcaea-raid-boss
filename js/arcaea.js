let bossOptions = {
  threshold: 98000000,
  weakness: new Set(),
  resist: new Set()
}

function getBossDamage(score, side, isClear) {
  if (!isClear) return 0

  let multiplier = 1
  if (bossOptions.weakness.has(side)) multiplier = 1.3
  if (bossOptions.resist.has(side)) multiplier = 0.7

  return multiplier * Math.max(score - bossOptions.threshold, 0)
}

$('#arc-threshold').on('change', function () {
  bossOptions.threshold = Number($(this).val())
})
$('.weakness').on('change', function () {
  let weakness = this.classList[2]
  if (this.checked) {
    bossOptions.weakness.add(weakness)
    $(`.resist.${weakness}`).prop('disabled', true)
  } else {
    bossOptions.weakness.delete(weakness)
    $(`.resist.${weakness}`).prop('disabled', false)
  }
})
$('.resist').on('change', function () {
  let resist = this.classList[2]
  if (this.checked) {
    bossOptions.resist.add(resist)
    $(`.weakness.${resist}`).prop('disabled', true)
  } else {
    bossOptions.resist.delete(resist)
    $(`.weakness.${resist}`).prop('disabled', false)
  }
})

$('button#arc-calc-damage').on('click', function() {
  let score = Number($('#arc-score').val())
  let side = $('#arc-side').val()
  let isClear = Number($('#arc-clear').val())
  let damage = getBossDamage(score, side, isClear)

  $('#arc-damage').val(damage)
})
