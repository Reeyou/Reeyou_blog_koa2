const jwt = require('jsonwebtoken') 
const key = require('../config/key')

function getToken(obj) {
  let result = jwt.sign(obj, key.secretKey, {expiresIn: 60})
  return result
}

module.exports = getToken