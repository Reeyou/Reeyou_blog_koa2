import ip from 'ip'

const { env } = process

export default {

    host: env.Host || ip.address(),

    port: env.Port || 3000,

    database: env.Database || 'mongodb://127.0.0.1:27017/dbs',

    jwtSecret: env.jwtSecret || 'Reeyou',
    // winston logger
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,
}
