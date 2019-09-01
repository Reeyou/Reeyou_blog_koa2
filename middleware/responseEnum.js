class responseEnum {
  constructor(code, msg) {
    this.code = code
    this.msg = msg
  }

  getCode() {
    return code
  }
  getMsg() {
    return msg
  }
}

const SUCCESS = new responseEnum(200, 'SUCCESS')
const ERROR = new responseEnum(200, 'ERROR')
const UNLOGIN = new responseEnum(200, 'UNLOGIN')
const ERROR_AUGUMENTS = new responseEnum(200, 'ERROR_AUGUMENTS')

module.export = {
  SUCCESS: SUCCESS,
  ERROR: ERROR,
  UNLOGIN: UNLOGIN,
  ERROR_AUGUMENTS: ERROR_AUGUMENTS
}