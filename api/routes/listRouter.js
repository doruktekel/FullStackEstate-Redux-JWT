import express from "express";
import { listCreate, listDelete } from "../controllers/listController.js";
import verifyUser from "../middlewares/verify.js";

const router = express.Router();

router.post("/create", verifyUser, listCreate);
router.delete("/delete/:id", verifyUser, listDelete);

export default router;
