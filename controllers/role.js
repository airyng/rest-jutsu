const DefaultController = require('./classes/Default')
const Role = require('../models/role')

module.exports = new DefaultController(Role)