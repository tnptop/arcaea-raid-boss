let player_info = {
  user_code: '090102644',
  character: 35,
  is_char_uncapped: false,
  is_char_uncapped_override: false,
  is_skill_sealed: false,
  rating: 1225
}

let player_score = {
  difficulty: 2, // [0, 1, 2, 3] => [pst, prs, ftr, byd]
  clear_type: 5, // [0, 1, 2, 3, 4, 5] => [lost, normal, fr, pm, easy, hard]
  health: 100,
  miss_count: 1,
  near_count: 1,
  perfect_count: 883,
  score: 9983909,
  song_date: 1590537607,
  song_id: 'vividtheory',
  song_side: 'conflict' // has to be obtained from database
}

let player_attempt = {
  "character": "zero_hikari",
  "is_char_uncapped": false,
  "is_char_uncapped_override": false,
  "rating": 1225,
  "difficulty": 2,
  "clear_type": 1,
  "health": 100,
  "miss_count": 0,
  "near_count": 0,
  "score": 10000839,
  "song_id": "vividtheory",
  "song_side": "conflict"
}

let player_attack = {
  multiplier: 1, // [0.5, 0.7, 1.3, 1.5] for [greater weakness, weakness, resistance, greater resistance]
  critical_rate: 10, // base at 10% (assumption)
  nullify_boss_skill: false,
  score: 9983909, // inherit from player_score
  health: 100, // inherit from player_score
  // everything else basically inherit from player_score
}

let boss_params = {
  health: 10000,
  shield: 9500000,
  weakness: [],
  greater_weakness: [],
  resistance: [],
  greater_resistance: [],
  skill: 'some skill name',
}

let curr_boss_params = JSON.parse(JSON.stringify(boss_params)) // basically deep clone of boss_params



function calculate_damage () {
  // 0. Check whether the player gets TRACK LOST or not, if so then the damage is 0, else continue
  if (player_score.clear_type === 0) {
    return
  }

  // 1. Apply partner's skill to get potential recollection gauge and score
  let partner_skill = () => {} // retrieve the function
  let { player_attack, curr_boss_params } = partner_skill({
    player_info, player_score, boss_params
  })

  // 2. Apply boss' skill to get net recollection gauge and score
  if (!player_attack.nullify_boss_skill) {
    player_attack = boss_params.skill(player_attack)
  }

  // 3. If recollection gauge is pushed to TRACK LOST (70% easy/normal, 1% hard, partner specific e.g. A DORO*C) and/or the score does not exceed boss' shield, they deal 0 damage
  if (
    player_score.clear_type < 5 && player_attack.health < 70 ||
    player_score.clear_type === 5 && player_attack.health < 1 ||
    player_attack.score <= curr_boss_params.shield
  ) {
    return
  }

  // 4. Calculate actual damage
  let damage = (player_attack.score - curr_boss_params.shield) * player_attack.multiplier * Math.random() < player_attack.critical_rate ? 1.5 : 1
  curr_boss_params.health -= damage

  // 5. Apply any player/boss buff, de-buff if exist, only those with set duration
  /**
   * possible player buff list
   * - increase damage (multiplication)
   * - increase critical rate (addition)
   *
   * possible player de-buff list
   * - decrease damage (multiplication)
   * - decrease critical rate (addition)
   * - partner prohibition
   *
   * possible boss buff list
   * - clear all de-buffs
   *
   * possible boss de-buff list
   * - switch weakness-resistance
   * - shield reduction
   * -
   */
}
