'use strict'

const router = require('express').Router()

const attack = require('../middleware/attack')
const boss = require('../middleware/boss')
const partner = require('../middleware/partner')
const song = require('../middleware/song')

router.get('/bosses/:_id', boss.getBoss)
router.post('/bosses', boss.createBoss)

router.get('/partners', partner.listPartners)
router.get('/partners/:name', partner.getPartner)

router.get('/songs', song.listSongs)
router.get('/songs/:name', song.getSong)

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
