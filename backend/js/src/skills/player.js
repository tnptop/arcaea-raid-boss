'use strict'

const RATE = [1.5, 1.3, 0.7, 0]

exports.getTypeMultiplier = ({ player_attack, curr_boss_params }) => {
  const { greater_weakness, weakness, resistance, greater_resistance } = curr_boss_params
  const { song_id } = player_attack
  const checks = [
    greater_weakness.includes(song_id),
    weakness.includes(song_id),
    resistance.includes(song_id),
    greater_resistance.includes(song_id)
  ]

  return RATE[checks.findIndex(Boolean)] || 1
}
