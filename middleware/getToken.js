const jwt = require('jsonwebtoken')
const config = require('../config')

function getToken(obj) {
    const result = jwt.sign(obj, config.jwtSecret, { expiresIn: 60 })
    return result
}

module.exports = getToken
