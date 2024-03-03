import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await User.findOne({_id: id});
    
    res.status(200).json({
        usuario
    })
}

export const usuariosPost = async (req, res) => {

    const {name, email, password} = req.body;
    const usuario = new User( {name, email, password} );

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const {_id, password, ...resto} = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);
    const usuario = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated user',
        usuario
    });
}