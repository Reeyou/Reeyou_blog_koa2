import { HttpException } from './src/middleware/HttpException'
import logger from './src/loaders/logger'

export default class Init {
    static app: any

    static initManage(app: any) {
        // 入口方法
        Init.app = app

        Init.loadHttpException() // 加入全局Exception
        Init.loadLogger() // 加入全局logger
    }

    static loadHttpException() {
        global.HttpException = HttpException
    }

    static loadLogger() {
        global.logger = logger
    }
}
