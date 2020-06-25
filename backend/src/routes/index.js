'use strict'

const router = require('express').Router()

const { apiKey, attack, boss, log, partner, song } = require('../middleware')

// force every endpoints to check API key
router.use(apiKey.checkApiKey)

router.get('/bosses/active', boss.getActiveBoss)
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

router.post('/testSocket', log.testSocket)

module.exports = router
