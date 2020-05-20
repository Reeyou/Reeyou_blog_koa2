import mongoose from 'mongoose'
import logger from './logger'

export default function mongodb(url: string) {
    mongoose.connect(url, {
        useNewUrlParser: true,
    })

    const db = mongoose.connection
    db.once('open', () => {
        logger.info('Mongodb is working now.')
    })
    db.on('error', (err) => {
        logger.error('Connection Error:\n', err)
    })
}
