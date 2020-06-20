'use strict'

const bossDb = require('../db/query/boss')

exports.getBoss = async (req, res, next) => {
  const { _id } = req.params
  const boss = await bossDb.get(_id)

  res.status(200).json({ boss })
}

exports.createBoss = async (req, res, next) => {
  const { boss_params } = req.body
  const id = await bossDb.create(boss_params)

  res.status(201).json({ id })
}
