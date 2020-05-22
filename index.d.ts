
declare module NodeJS {
    interface Global {
        HttpException: any,
        logger: any,
        Constants: any
    }
}

declare const HttpException: any
declare const logger: any
declare const Constants: any