'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const routes = require('./src/routes')

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(compression())
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))

app.use(routes)

app.listen(54321, () => console.log('RAID BOSS UP @ 54321'))
