'use strict'

const bossDb = require('../db/query/boss')

exports.getBoss = async (req, res, next) => {
  try {
    const { _id } = req.params
    const boss = await bossDb.get(_id)

    res.status(200).json({boss})
  } catch (e) {
    next(e)
  }
}

exports.createBoss = async (req, res, next) => {
  try {
    const {boss_params} = req.body
    const id = await bossDb.create(boss_params)

    res.status(201).json({ id })
  } catch (e) {
    next(e)
  }
}
