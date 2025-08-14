import express from 'express';
import mongoose from 'mongoose';

import Category from '../models/Category.js';

const router = express.Router();

export const addCategory = async (req, res) => {
    const { name, description, status  } = req.body;

    const createCategory = new Category({
        name,
        description,
        status,
    });

    try{
        await createCategory.save();
        res.status(201).json({createCategory});
    }
    catch(err){
        res.status(500).json({error: err});
    }
}

export const getAllCategory = async (req, res) => {
    try{
        const category = await Category.find();
        res.status(200).json({category});
    }catch(err){
        res.status(500).json({error: err});
    }
}

export const getCategory = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await Category.findById(id);
        res.status(200).json({data});
    }
    catch(err){
        res.status(500).json({error: err});
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Not a valid id for this category');
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description, status }, // Chỉ cập nhật các trường này
            { new: true }  // Trả về document mới sau khi update
        );
        if (!updatedCategory) {
            return res.status(404).send('Category not found');
        }
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the category.", error: err.message });
    }
};


export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('Not a valid id for this category');
    try{
        const data = await Category.findByIdAndDelete(id);
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({error: err});
    }
}