import winston, { format } from 'winston'
import config from '../config'

const { printf } = format

const myFormat = printf(({ level, message, timestamp }) => `[${timestamp}] [${level}] - ${message}`)


const transports = []

if (process.env.NODE_ENV !== 'development') {
    transports.push(
        // [2020-05-20 16:29:14] [info] - Mongodb is working now.
        new winston.transports.Console({
            format: myFormat,
        }),
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            ),
        }),
    )
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports,
})

export default LoggerInstance
