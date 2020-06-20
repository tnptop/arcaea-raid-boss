'use strict'

const router = require('express').Router()

const attack = require('../middleware/attack')
const boss = require('../middleware/boss')

router.get('/boss/:_id', boss.getBoss)
router.post('/boss', boss.createBoss)
router.post(
  '/attack',
  attack.beginAttack,
  attack.checkTrackLoss,
  attack.activatePartnerSkill,
  attack.activateBossSkill,
  attack.checkTrackLossAfterSkill,
  attack.calculateDamage,
  attack.applyChanges,
  attack.endAttack
)

module.exports = router
