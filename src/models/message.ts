import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    // 回复用户名
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } })

const Message = model('Message', messageSchema)

export default Message
