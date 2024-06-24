import express from "express";
import {
  deleteUser,
  getUserListings,
  updateUser,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/verify.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/list/:id", verifyUser, getUserListings);

export default router;
