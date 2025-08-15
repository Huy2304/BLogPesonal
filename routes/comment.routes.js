import express from "express";

import {addComment,getAllComment,updateComment,deleteComment} from "../controllers/Comment.controllers.js";
import {deleteCategory, updateCategory} from "../controllers/Category.controllers.js";

const router = express.Router();
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getAllComment);
router.post("/", addComment);

export default router;