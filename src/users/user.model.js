import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: [true, "El nombre es obligatorio"],
    },
    correo: {
        type: String,
        require: [true, "El correo es obligatorio"],
        unique: true,
    },
    password: {
        type:String,
        require: [true, "La contraseña es obligatoria"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function(){
    const { _v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);