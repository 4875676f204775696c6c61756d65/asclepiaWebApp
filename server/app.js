const express = require('express')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')

const apiRouter = require('./routes/api.js')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: 'cqnuhjqsdnbcfkq', saveUninitialized: false, resave: false }))
app.use(express.static(path.join(__dirname, '../client')))

app.use('/api/', apiRouter)

app.get('/info', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API on construct. Asclepia web app.' })
})

module.exports = app
