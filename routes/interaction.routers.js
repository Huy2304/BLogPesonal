import express from "express";
import {toggleInteraction} from "../controllers/Interaction.controllers.js";

const router = express.Router();

router.post("/interaction", toggleInteraction);

export default router;
