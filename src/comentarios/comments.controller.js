import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Comment from "./comments.model.js";
import Publications from "../publicaciones/publications.model.js";
import User from '../users/user.model.js';

export const commentPost = async (req, res) => {
    try {
        const { title, comments, publicationId } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        const publications = await Publications.findById(publicationId);

        await publications.save();
    
        res.status(200).json({
            publications
        });


        const comment = new Comment({ title, comments, publicationId, userId });
        await comment.save();

        res.status(200).json({
            publications
        })
    } catch (e) {
        console.log("Probably you don't enter a required field");
        console.log(e);
    }
}

export const commentPut = async (req, res) => {
    try {
        const { __v, _id, state, publicationId, userId, ...rest } = req.body;
        const userIdLogged = req.user._id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        if (!comment.state) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        const commentUserId = comment.userId.toString();
        const loggedUserId = userIdLogged.toString();

        if (commentUserId !== loggedUserId) {
            return res.status(403).json({
                msg: 'You do not have permissions to update this comment'
            });
        }

        Object.assign(comment, rest);

        await comment.save();

        res.status(200).json({
            msg: 'Comment update successfully'
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error processing request"
        });
    }
}

export const commentDelete = async (req, res) => {
    try {
        const userId = req.user._id;
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        if (!comment.state) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        const commentUserId = comment.userId.toString();
        const loggedUserId = userId.toString();

        if (commentUserId !== loggedUserId) {
            return res.status(403).json({
                msg: 'You do not have permissions to update this comment'
            });
        }

        await comment.save();

        res.status(200).json({
            msg: "Comment deleted successfully"
        })
        await comment.save();
    } catch (e) {
        console.error(e),
            res.status(500).json({
                msg: "Error processing request"
            });
    }
}