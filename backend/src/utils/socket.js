'use strict'

let io
module.exports = {
  init: (server) => {
    io = require('socket.io').listen(server)
  },
  io: () => {
    if (!io) throw new Error('Please call .init(server) first')
    return io
  }
}
