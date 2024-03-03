import mongoose, { Schema } from 'mongoose';

const PublicationsSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "The title is required for publication"],
    },
    category: {
        type: String,
        require: [true, "The category is mandatory"],
    },
    text: {
        type: String,
        require: [true, "The text is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, "The user is required"],
    },
    state: {
        type: Boolean,
        default: true,
    },
});

PublicationsSchema.methods.toJSON = function(){
    const { _v, password, _id, ...publicacion} = this.toObject();
    publicacion.uid = _id;
    return publicacion;
}

export default mongoose.model('Publications', PublicationsSchema);