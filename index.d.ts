
declare module NodeJS {
    interface Global {
        HttpException: any,
        logger: any
    }
}

declare const HttpException: any
declare const logger: any