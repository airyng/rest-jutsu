const express = require('express')
const router = express.Router()

const modules = {
  auth: require('./modules/auth.js'),
  users: require('./modules/users.js')
}

Object.keys(modules).map(key => {
  modules[key](router)
})

module.exports = router