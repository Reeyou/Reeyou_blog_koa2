import mongoose from 'mongoose'

export default function mongodb(url: string) {
    mongoose.connect(url, {
        useNewUrlParser: true,
    })

    const db = mongoose.connection
    db.once('open', () => {
        global.logger.info('Mongodb is working now.')
    })
    db.on('error', (err) => {
        global.logger.error('Connection Error:\n', err)
    })
}
