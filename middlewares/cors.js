module.exports = function (req, res, next) {

  if (!process.env.ALLOW_ORIGIN) {
    res.append('Access-Control-Allow-Origin', '*')
  }
  else {
    const availableOrigins = process.env.ALLOW_ORIGIN?.split(',')

    if (availableOrigins.includes(req.headers?.origin)) {
      res.append('Access-Control-Allow-Origin', [req.headers?.origin])
    }
  }
  res.append('Access-Control-Allow-Methods', '*')
  res.append('Access-Control-Allow-Headers', '*')
  next()
}
