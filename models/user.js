const mongoose = require('mongoose')
const { Schema } = mongoose
const Authenticator = require('../helpers/Authenticator')
const Role = require('./role')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null,
    required: true,
    unique : true
  },
  passwordHash: {
    type: String,
    required: true
  },
  avatar_id: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: Role,
    required: true
  }
})

const userModel = mongoose.model('User', schema)

userModel.findByToken = async function (accessToken) {

  const tokenPayload = Authenticator.decodeToken(accessToken)
  if (!tokenPayload) { return false }

  let user = null

  try {
    user = await userModel
              .findById(tokenPayload?.userId)
              .select('-passwordHash')
              .populate('role')
  } catch (e) {
    console.error(e)
  }
  if (user && Object.keys(user).length === 0) { return false }
  return user
}

module.exports = userModel