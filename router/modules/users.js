const userController = require.main.require('./controllers/user')

module.exports = function (router) {
  
  // Getting all users
  router.get('/users', userController.do('getItems'))

  // Getting One user
  router.get('/users/:id', userController.do('getItem'))

  // Creating one user
  router.post('/users', userController.do('create'))

  // Updating One user
  router.patch('/users/:id', userController.do('update'))

  // Deleting One game
  router.delete('/users/:id', userController.do('delete'))
}