import { Schema, model, Document } from 'mongoose'

const tagSchema = new Schema({
    tagId: {
        type: String,
    },
    tagName: {
        type: String,
        required: true,
    },
})

interface TagDocument extends Document {
    _id: Schema.Types.ObjectId;
    tagId: string;
    tagName: string;
}

const Tag = model<TagDocument>('Tag', tagSchema)

export default Tag
