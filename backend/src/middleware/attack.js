'use strict'

const clone = require('clone')

const boss = require('../skills/boss')
const bossDb = require('../db/query/boss')
const partner = require('../skills/partner')
const player = require('../skills/player')

// base stat for each attack
const base_player_attack = {
  multiplier: 1, // for partner/boss skills
  critical_rate: 10, // base at 10% (assumption)
  nullify_boss_skill: false,
  damage: 0,
}

exports.beginAttack = async (req, res, next) => {
  res.locals.curr_boss_params = await bossDb.getActive()
  res.locals.player_attack = Object.assign({}, base_player_attack, req.body.player_attempt)
  next()
}

exports.checkTrackLoss = (req, res, next) => {
  const { clear_type } = res.locals.player_attack

  if (clear_type === 0) {
    return res.status(200).json({ damage: 0 })
  }
  next()
}

exports.activatePartnerSkill = (req, res, next) => {
  res.locals = partner.activatePartnerSkill(res.locals)
  next()
}

exports.activateBossSkill = (req, res, next) => {
  const { player_attack, curr_boss_params } = res.locals

  if (!player_attack.nullify_boss_skill) {
    res.locals.player_attack = boss.activateBossSkill(curr_boss_params.name, player_attack)
  }
  next()
}

exports.checkTrackLossAfterSkill = (req, res, next) => {
  const { player_attack, curr_boss_params } = res.locals
  const { clear_type, score, health } = player_attack
  const { shield } = curr_boss_params

  let normalFail = clear_type < 5 && health < 70
  let hardFail = clear_type === 5 && health < 1
  let attackFail = score <= shield

  if (normalFail || hardFail || attackFail) {
    return res.status(200).json({ damage: 0 })
  }
  next()
}

exports.calculateDamage = (req, res, next) => {
  const { player_attack, curr_boss_params } = res.locals
  const { score, multiplier, critical_rate } = player_attack
  const { shield } = curr_boss_params
  const type_multiplier = player.getTypeMultiplier(res.locals)

  res.locals.player_attack.damage =
    Math.floor((score - shield) / 1000) * type_multiplier * multiplier * (Math.random() * 100 < critical_rate ? 1.5 : 1)
  next()
}

exports.applyChanges = async (req, res, next) => {
  const { player_attack, curr_boss_params } = res.locals
  const new_boss_params = clone(curr_boss_params)

  new_boss_params.health -= player_attack.damage
  await bossDb.updateActive(curr_boss_params._id, new_boss_params)
  next()
}

exports.endAttack = (req, res, next) => {
  const { damage } = res.locals.player_attack
  res.status(200).json({ damage })
}
