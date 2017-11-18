/**
 * Created by swpmr on 11/18/2017.
 */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('../src/model/users')
const router = express.Router()

module.exports = function (app) {
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    res.setHeader('Cache-Control', 'no-cache')

    // Pass to next layer of middleware
    next()
  })
  router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'})
  })

  app.use('/api', router)
  const mongoDB = 'mongodb://swampi:garile@ds259855.mlab.com:59855/your-organizer'
  mongoose.connect(mongoDB, {
    useMongoClient: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  router.route('/users')
    .get(function (req, res) {
      User.find(function (err, users) {
        if (err)
          res.send(err)
        res.json(users)
      })
    })
    .post(function (req, res) {
      var newUser = new User()
      newUser.user = req.body.user
      newUser.password = req.body.password
      newUser.save(function (err) {
        if (err)
          res.send(err)
        res.json({
          message: 'User successfully created'
        })
      })
    })
}
