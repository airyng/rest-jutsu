const authController = require.main.require('./controllers/authenticate')

module.exports = function (router) {
  
  router.post('/register', authController.do('register'))

  router.post('/login', authController.do('login'))
  // Update access token by refresh token
  router.post('/token', authController.do('token'))

  router.delete('/logout/:token', authController.do('logout'))
}