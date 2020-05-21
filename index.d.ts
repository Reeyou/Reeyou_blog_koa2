
declare module NodeJS {
    interface Global {
        HttpException: any,
        logger: any,
        // ServerResponse: any
    }
}

declare const HttpException: any
declare const logger: any
// declare const ServerResponse: any