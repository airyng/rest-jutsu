const bcrypt = require('bcryptjs')

class Encryptor {

  static hash (commonString) {
    return bcrypt.hashSync(commonString, 10)
  }

  static verify (commonString, hashString) {
    return bcrypt.compareSync(commonString, hashString)
  }
}

module.exports = Encryptor