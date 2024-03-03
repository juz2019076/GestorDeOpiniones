import mongoose, { Schema } from "mongoose";

const CommentsSchema = mongoose.Schema({
    publicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Publications'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
        require: [true, 'The title is required'],
    },
    comments: {
        type: String,
        require: [true, 'The comment is required'],
    },
    state: {
        type: Boolean,
        default: true,
    }
});

CommentsSchema.methods.toJSON = function(){
    const { _v, _id, state, ...comment} = this.toObject();
    comment.uid = _id;
    return comment;
}

export default mongoose.model('Comment', CommentsSchema);