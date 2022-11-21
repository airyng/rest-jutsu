const authController = require.main.require('./controllers/authenticate')

module.exports = function (router, middlewares) {
  
  router.post('/register', authController.endpoint('register'))

  router.post('/login', authController.endpoint('login'))

  // Update access token by refresh token
  router.post('/token', authController.endpoint('token'))

  router.delete('/logout/:token', authController.endpoint('logout'))
}