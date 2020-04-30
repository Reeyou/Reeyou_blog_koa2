import ip from 'ip'

const { env } = process

export default {
    // 主机地址
    host: env.Host || ip.address(),
    // 端口地址
    port: env.Port || 3000,
    // 数据库地址
    database: env.Database || 'mongodb://127.0.0.1:27017/dbs',
    // 加密值
    jwtSecret: env.jwtSecret || 'Reeyou',
    // token过期时间
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,
}
