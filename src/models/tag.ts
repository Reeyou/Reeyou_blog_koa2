import { Schema, model, Document } from 'mongoose'

const tagSchema = new Schema({
    tagId: {
        type: Schema.Types.ObjectId,
    },
    tagName: {
        type: String,
        required: true,
    },
})

interface TagDocument extends Document {
    _id: Schema.Types.ObjectId;
    tagId: Schema.Types.ObjectId;
    tagName: string;
}

const Tag = model<TagDocument>('Tag', tagSchema)

export default Tag
