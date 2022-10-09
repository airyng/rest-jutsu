const BaseController = require('./classes/Base')
const Authenticator = require('../helpers/Authenticator')
const Encryptor = require('../helpers/Encryptor')
const Role = require('../models/role')
const User = require('../models/user')

const DEFAULT_ROLE = 'user'

class AuthenticateController extends BaseController {
  
  middlewaresRelations = {}

  constructor () {
    super()
  }

  async token (req, res) {
    const refreshToken = req.body.refresh_token

    if (refreshToken == null) return res.sendStatus(401)

    const newAccessToken = await Authenticator.refreshAccessToken(refreshToken)

    return newAccessToken ? res.json(newAccessToken) : res.sendStatus(403)
  }

  async logout (req, res) {
    if (req.params.token) {
      Authenticator.signOut(req.params.token)
    }
    res.sendStatus(204)
  }

  // Authenticate User
  async login (req, res) {
    if (req.headers['authorization']) { return res.sendStatus(403) }

    const user = await User.findOne({email: req.body.email })
    if (!user) return res.sendStatus(404)

    if (Encryptor.verify(req.body.password, user.passwordHash)) {
      return res.json( Authenticator.signIn(user._id) ) // Authenticator.login returns object with tokens
    }
    return res.sendStatus(404)
  }

  async register (req, res) {
    if (req.headers['authorization']) { return res.sendStatus(403) }
    
    try {
      if (
        !req.body.password ||
        !req.body.password_confirmation ||
        req.body.password !== req.body.password_confirmation
      ) {
        throw { errors: { password: { kind: 'mismatch' } } }
      }

      const existentUser = await User.findOne({ email: req.body.email})
      if (existentUser) {
        throw { errors: { email: { kind: 'unique' } } }
      }

      const userRole = await Role.findOne({ title: DEFAULT_ROLE })
      const user = await User.create({
        ...req.body,
        role: userRole?._id || null,
        passwordHash: req.body?.password ? Encryptor.hash(req.body.password) : null
      })
      return res.json( Authenticator.signIn(user._id) ) // Authenticator.login returns object with tokens
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}

module.exports = new AuthenticateController()