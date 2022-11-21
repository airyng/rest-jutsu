const express = require('express')
const router = express.Router()
const middlewares = require.main.require('./boot/middlewareManager')

const modules = {
  auth: require('./modules/auth.js'),
  users: require('./modules/users.js')
}

Object.keys(modules).map(key => {
  modules[key](router, middlewares.common)
})

module.exports = router