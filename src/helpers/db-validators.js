import User from '../users/user.model.js';

export const existeEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`The email ${correo} has already been registered`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeusuario = await User.findById(id);
    if (!existeusuario){
        throw new Error(`The ID: ${correo} does not exist`);
    }
}