'use strict'

const sio = require('../utils/socket')

exports.testSocket = (req, res, next) => {
  const io = sio.io()
  const { message } = req.body

  io.sockets.emit('log', { message: `Message from server: ${message}` })
  res.sendStatus(200)
}
