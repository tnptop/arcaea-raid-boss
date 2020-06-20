boss_params = {
  hp: 20000,
  shield: 9500,
  weakness: {
    light: false,
    conflict: false,
  },
  resistance: {
    light: false,
    conflict: false,
  }
}

player_params = {
  rating: 1222,
  partner: 0, // have to gather code for each partnets
  is_char_uncapped: true, // true for awakened, false otherwise (including partners that can be awakened but not yet)
  is_char_uncapped_override: false, // true if awakened partner is reverted to unawakened form
  is_skill_sealed: false, // true if sealed
}

player_score = {
  song_id: 'tiferet',
  song_side: 'conflict', // temporary for this prototype
  score: 9800000,
  health: 100,
  difficulty: 2, // [0, 1, 2, 3] => [pst, prs, ftr, byd]
  clear_type: 5, // [0, 1, 2, 3, 4, 5] => [lost, normal, fr, pm, easy, hard]
  near_count: 10,
  miss_count: 10,
  fragments: 50
}

function calculate_damage(boss_params, player_params, player_score) {

}
