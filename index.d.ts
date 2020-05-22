
declare module NodeJS {
    interface Global {
        HttpException: any,
        logger: any,
        Constants: any,
        utils: any
    }
}

declare const HttpException: any
declare const logger: any
declare const Constants: any
declare const utils: any