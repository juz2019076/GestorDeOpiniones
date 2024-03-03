import { response, request, json } from "express";
import bcryptjs from 'bcryptjs';
import Publications from './publications.model.js';
import User from '../users/user.model.js';

export const getPublicationsById = async (req, res) => {
    const { id } = req.params;
    const publications = await Publications.findOne({ _id: id });

    res.status(200).json({
        publications
    })
}

export const publicationsPost = async (req, res) => {

    const { title, category, text } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    const publications = new Publications({ title, category, text, user: userId });

    await publications.save();

    res.status(200).json({
        publications
    });
}

export const publicationsPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;
        const{ user } = req;

        const publics = await Publications.findById(id);

        if (!publics || publics.user.toString() !== user._id.toString()) {
            return res.status(403).json({
                msg: 'Unauthorized access',
            });
        }

        const publicationsActualizada = await Publications.findByIdAndUpdate(id, resto);
 
 
        res.status(200).json({
            msg: 'The post was updated successfully.',
            publics: publicationsActualizada
        });
    } catch (e) {
        console.error('Error creating publication', e);
        res.status(500).json({ e: "Internal Server Error" });
    }
}

export const publicationsDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;

        const publication = await Publications.findById(id);

        if(!publication || publication.user.toString() !== user._id.toString()){
            return res.status(403).json({
                msg: 'Unauthorized access',
            });
        }

        const deletedPublication = await Publications.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Deleted publication', publication: deletedPublication });
    } catch(e) {
        console.error('Error deleting publication', e);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}