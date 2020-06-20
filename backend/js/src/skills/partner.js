'use strict'

const clone = require('clone')

const _is_awakened = (player_attack) =>
  player_attack.is_char_uncapped && !player_attack.is_char_uncapped_override

const _switch_alignment = (curr_boss_params) => {
  const { weakness, greater_weakness, resistance, greater_resistance } = clone(curr_boss_params)

  curr_boss_params.weakness = resistance
  curr_boss_params.resistance = weakness
  curr_boss_params.greater_weakness = greater_resistance
  curr_boss_params.greater_resistance = greater_weakness
}

const _null_alignment = (curr_boss_params) => {
  curr_boss_params.weakness = []
  curr_boss_params.resistance = []
  curr_boss_params.greater_weakness = []
  curr_boss_params.greater_resistance = []
}

const activate_partner_skill = (attack_params) => {
  const { player_attack, curr_boss_params } = clone(attack_params)
  const partner = `${player_attack.character}${_is_awakened(player_attack) ? '_awakened' : ''}`

  partners[partner]({ player_attack, curr_boss_params })
  return { player_attack, curr_boss_params }
}

const partners = {
  hikari: ({ player_attack }) => {
    player_attack.health += 5
  },
  hikari_awakened: ({ player_attack }) => {
    player_attack.health += 10
  },
  tairitsu: ({ player_attack, curr_boss_params }) => {
    if (curr_boss_params.resistance.includes(player_attack.song_id)) {
      curr_boss_params.shield -= 10000
    }
  },
  tairitsu_awakened: ({ player_attack, curr_boss_params }) => {
    if (curr_boss_params.resistance.includes(player_attack.song_id)) {
      curr_boss_params.shield -= 20000
    }
  },
  axium_tairitsu: ({ player_attack }) => {
    player_attack.multiplier = 1.2
    player_attack.critical_rate = 0
  },
  gl_tairitsu: ({ player_attack, curr_boss_params }) => {
    const { weakness, greater_weakness } = curr_boss_params
    let is_weakness = weakness.concat(greater_weakness).includes(player_attack.song_id)

    player_attack.multiplier = is_weakness ? 1.3 : 0
  },
  zero_hikari: ({ player_attack, curr_boss_params }) => {
    const { health } = player_attack

    player_attack.multiplier = health === 100 ? 1.2 : 0
    player_attack.critical_rate += 50
    _null_alignment(curr_boss_params)
  },
  fracture_hikari: ({ player_attack, curr_boss_params }) => {
    const { resistance, greater_resistance } = curr_boss_params
    let is_resistance = resistance.concat(greater_resistance).includes(player_attack.song_id)

    player_attack.nullify_boss_skill = true
    player_attack.multiplier = is_resistance ? 0 : 1
  },
  summer_hikari: ({ player_attack, curr_boss_params }) => {
    _switch_alignment(curr_boss_params)
    player_attack.health += 10
  },
  summer_tairitsu: ({ curr_boss_params }) => {
    _switch_alignment(curr_boss_params)
    curr_boss_params.shield -= 20000
  },
  fantasia_hikari: ({ player_attack }) => {
    player_attack.health += 10
  },
  sonata_tairitsu: ({ player_attack, curr_boss_params }) => {
    if (curr_boss_params.resistance.includes(player_attack.song_id)) {
      curr_boss_params.shield -= 20000
    }
  },
  tempest_tairitsu: ({ player_attack }) => {
    const { rating } = player_attack
    if (rating > 1200) {
      player_attack.multiplier = 1.3
    } else {
      // apply bleeding
    }
  }
}

module.exports = {
  activatePartnerSkill: activate_partner_skill,
}
