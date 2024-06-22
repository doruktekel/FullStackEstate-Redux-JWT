import express from "express";
import { listCreate } from "../controllers/listController.js";

const router = express.Router();

router.post("/create", listCreate);

export default router;
