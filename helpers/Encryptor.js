const bcrypt = require('bcryptjs')
const crypto = require('crypto')

class Encryptor {

  static hash (commonString, type = 'bcrypt') {
    if (type === 'bcrypt') {
      return bcrypt.hashSync(commonString, 10)
    }
    if (type === 'md5') {
      return crypto.createHash('md5').update(commonString).digest('hex')
    }
    else {
      throw new Error('Given unknown hash type.')
    }
  }

  static verify (commonString, hashString) {
    return bcrypt.compareSync(commonString, hashString)
  }
}

module.exports = Encryptor