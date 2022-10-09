const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/refreshToken.js')

class Authenticator {

  static signIn (userId) {
    const payload = { userId }

    const accessToken = this.#generateAccessToken(payload)
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)

    const token = new RefreshToken({ token: refreshToken })
    // Здесь предумышленно не обрабатываются ошибки, так как их значение на функционал минимально.
    // В случае необходимости их обработки, лучше будет подключить сохранение логов в файл и добавить здесь.
    token.save()

    return { accessToken, refreshToken }
  }

  static async signOut (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken })
  }

  static async refreshAccessToken (refreshToken) {
    const foundToken = await RefreshToken.findOne({ token: refreshToken })
    if (!foundToken) return false

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) return false
      return { accessToken: this.#generateAccessToken({ userId: payload.userId }) }
    })
  }

  static decodeToken (accessToken) {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) { return false }
      return payload
    })
  }

  static #generateAccessToken (payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES}s` })
  }
}

module.exports = Authenticator