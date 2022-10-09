const User = require('../models/user.js')

function authenticateToken (model) {

  return async function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)
    const user = await User.findByToken(token)

    if (!user) { return res.sendStatus(403) }
    req.user = user

    next()
  }
}

module.exports = authenticateToken