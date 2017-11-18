/**
 * Created by swpmr on 11/18/2017.
 */
'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var usersSchema = new Schema({
  user: String,
  password: String
})

module.exports = mongoose.model('user', usersSchema)
