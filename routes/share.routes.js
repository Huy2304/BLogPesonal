import express from "express";
import {
    sharePost,
    updateSharePost,
    deleteSharePost,
    getAllShares
} from "../controllers/Share.controllers.js";

const router = express.Router();
router.get("/", getAllShares);
router.put("/:share_id", updateSharePost);
router.delete("/:share_id", deleteSharePost);
router.post("/", sharePost);

export default router;