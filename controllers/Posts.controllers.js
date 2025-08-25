// controllers/Posts.controllers.js
import * as PostService from "../services/posts.service.js";

export const getAllPosts = async (req, res) => {
  try {
    const data = await PostService.listPosts(req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const created = await PostService.createPost(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(e.status || 409).json({ message: e.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const data = await PostService.getPostById(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

export const updateSinglePost = async (req, res) => {
  try {
    const updated = await PostService.updatePost(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

export const removeSinglePost = async (req, res) => {
  try {
    const out = await PostService.deletePost(req.params.id);
    res.json(out);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

