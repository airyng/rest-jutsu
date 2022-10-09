const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('refresh_token', schema)