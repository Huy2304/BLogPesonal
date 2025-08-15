import express from "express";
import mongoose from "mongoose";

import Comment from "../models/Comment.js";
const router = express.Router();

export const addComment = async (req, res) => {
    const {post_id, user_id, parent_id, content, created_at} = req.body;

    const comment = new Comment({
        post_id,
        user_id,
        parent_id,
        content,
        created_at,
    })
    try {
        await comment.save();
        res.status(201).json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getAllComment = async (req, res) => {
    const post_id = req.params.post_id;
    try{
        const data = await Comment.findById(post_id)
        res.status(200).json({data})
    }catch(err){
        res.status(500).json({error: err})
    }
}

export const deleteComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    try{
        if(mongoose.Types.ObjectId.isValid(comment_id)){
            return res.status(401).json({error: "Comment already exists"})
        }
        const data = await Comment.findByIdAndDelete(comment_id);
        res.status(200).json({data,success:true,message:"Comment deleted"})
    }catch(err){
        res.status(500).json({error: err})
    }
}
export const updateComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    const{content, created_at} = req.body;
    if(mongoose.Types.ObjectId.isValid(comment_id)){
        return res.status(401).json({error: "Comment already exists"})
    }
    try{
        const data = await Comment.findByIdAndUpdate(comment_id, content, created_at)
        res.status(200).json({data,success:true,message:"Comment update successful"})
    }catch(err){
        res.status(500).json({error: err})
    }
}