const responseEnum = require('./responseEnum')

function serverResponse(code,msg,data) {
  this.code = code;
  this.msg = msg;
  this.data = data
}

function serverSuccessMsg(msg, data) {
  return serverResponse(responseEnum.SUCCESS.getCode(),msg,data)
}

function serverErrorMsg(errMsg, data) {
  return serverResponse(responseEnum.ERROR.getCode(),errMsg,data)
}
module.exports  = {
  serverSuccessMsg: serverSuccessMsg,
  serverErrorMsg: serverErrorMsg
}


