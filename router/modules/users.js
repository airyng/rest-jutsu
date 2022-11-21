const userController = require.main.require('./controllers/user')
const User = require.main.require('./models/user')

module.exports = function (router, middlewares) {
  
  // Getting all users
  router.get('/users', userController.endpoint('getItems'))

  // Getting One user
  router.get('/users/:id', userController.endpoint('getItem'))

  // Updating One user
  router.patch('/users/:id', userController.endpoint('update'))

  // Deleting One game
  router.delete('/users/:id', middlewares.authenticateToken, middlewares.getItemById(User), userController.endpoint('delete'))
}