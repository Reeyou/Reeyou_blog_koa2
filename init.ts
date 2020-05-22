import { HttpException } from './src/middleware/HttpException'
import logger from './src/loaders/logger'
import Constants from './src/common/constants'
import Utils from './src/utils'

export default class Init {
    static app: any

    static initManage(app: any) {
        // 入口方法
        Init.app = app

        Init.loadHttpException() // 加入全局Exception
        Init.loadLogger() // 加入全局logger
        Init.loadConstans()
        Init.loadUtils()
    }

    static loadHttpException() {
        global.HttpException = HttpException
    }

    static loadLogger() {
        global.logger = logger
    }

    static loadConstans() {
        global.Constants = Constants
    }

    static loadUtils() {
        global.utils = Utils
    }
}
