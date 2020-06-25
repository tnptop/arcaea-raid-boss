'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const morgan = require('morgan')

const sio = require('./src/utils/socket')
const app = express()
const server = http.createServer(app)
sio.init(server)

// apply app-wide middleware
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(compression())
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))

// apply defined router
const router = require('./src/routes')
const { errorHandler } = require('./src/utils/errorHandler')

app.use(router)
app.use(errorHandler)

server.listen(process.env.PORT || 1431, () => console.log('RAID BOSS UP @ 1431'))
