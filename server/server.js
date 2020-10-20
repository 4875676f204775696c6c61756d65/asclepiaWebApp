//import depmendencies
const express = require('express')
const session = require('express-session')
//Difference des dif parser?? => prof 
//const bodyParser = require('body-parser')
const logger = require('morgan')
const http = require('http')
const path = require('path')

const port = 3000

const apiRouter = require('./routes/api.js')

//create express instance
const app = express();

// create server 

//var server = http.createServer(app)

// On listen sur le serveur pas sur app
//server.listen(port)

// Avec le serveur creer
//app.set(port)

//Demandez explication sur ces modules => prof
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//Cookie parser inutile now
app.use(session({ secret: 'icqnuhjqsdnbcfkqcb', saveUninitialized: false, resave: false }))
app.use(express.static(path.join(__dirname, '../client')))

//Listen sans creer le serveur 
app.listen(port, () => {
    console.log('Server started on port ' + port.toString() + '.')
})

app.use('/api/', apiRouter)


app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API on construct. Asclepia web app.' })
})


module.exports = app