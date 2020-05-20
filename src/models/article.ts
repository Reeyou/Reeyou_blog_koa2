import { Schema, model } from 'mongoose'

const articleSchema = new Schema({
    // tag_id: {
    //   type: String,
    //   required: true
    // },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
    },
    tag: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } })

const Article = model('Article', articleSchema)

export default Article
