// routes/blogPosts.routes.js
import express from "express";

import {
  getAllPosts,
  addPost,
  getSinglePost,
  updateSinglePost,
  removeSinglePost,
  likePost,
} from "../controllers/Posts.controller.js";

const router = express.Router();

// Lấy tất cả bài viết
router.get("/", getAllPosts);

// Thêm bài viết mới
router.post("/", addPost);

// Lấy thông tin bài viết theo ID
router.get("/:id", getSinglePost);

// Cập nhật bài viết theo ID
router.patch("/:id", updateSinglePost);

// Xóa bài viết theo ID
router.delete("/:id", removeSinglePost);

// Thích bài viết theo ID
router.patch("/:id/like", likePost);

export default router;
