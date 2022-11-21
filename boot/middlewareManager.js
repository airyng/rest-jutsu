module.exports = {
  common: {
    getItemById: require.main.require('./middlewares/getItemById'),
    authenticateToken: require.main.require('./middlewares/authenticateToken')
  },
  global: {
    cors: require.main.require('./middlewares/cors')
  }
}