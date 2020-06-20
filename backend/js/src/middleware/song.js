'use strict'

const songDb = require('../db/query/song')

exports.listSongs = async (req, res, next) => {
  try {
    const songs = await songDb.list()

    res.status(200).json({songs})
  } catch (e) {
    next(e)
  }
}

exports.getSong = async (req, res, next) => {
  try {
    const {name} = req.params
    const song = await songDb.get(name)

    res.status(200).json({song})
  } catch (e) {
    next(e)
  }
}
