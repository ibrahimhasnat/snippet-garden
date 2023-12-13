const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

  const token = req.headers['authorization']

  if (!token) {
    res.status(403).json({ message: 'Token not provided' })
    return
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      res.status(401).json({ message: 'Failed to authenticate token' })
      return
    }

    req.userId = decoded.userId
    next()

  })

}

module.exports = verifyToken