import ip from 'ip'
import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envConfig = dotenv.config()

const { env } = process

if (!envConfig) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {

    host: env.Host || ip.address(),

    port: env.Port || 3000,

    database: env.Database || 'mongodb://127.0.0.1:27017/dbs',

    jwtSecret: env.jwtSecret || 'Reeyou',

    logs: {
        level: env.LOG_LEVEL || 'silly',
    },

    tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,
}
