const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const authController = require('../controllers/authenticate')

// [Auth - Start]

router.post('/register', authController.do('register'))

router.post('/login', authController.do('login'))

router.post('/token', authController.do('token'))

router.delete('/logout/:token', authController.do('logout'))

// [Auth - End]

// [Users - Start]

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

// [Users - End]

module.exports = router