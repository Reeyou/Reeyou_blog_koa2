import winston, { format } from 'winston'
import config from '../config'


const transports = []

if (process.env.NODE_ENV !== 'development') {
    transports.push(
        // 日志打印并保存
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
            ),
        }),
        new winston.transports.File({ filename: 'logger.log' }),
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: format.combine(
                format.cli(),
                format.splat(),
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
