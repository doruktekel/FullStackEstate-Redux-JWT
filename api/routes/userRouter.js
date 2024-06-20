import express from "express";
import { updateUser } from "../controllers/userController.js";
import verifyUser from "../middlewares/verify.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);

export default router;
