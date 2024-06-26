import express from "express";
import {
  deleteUser,
  getUserListings,
  updateUser,
  getUser,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/verify.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/list/:id", verifyUser, getUserListings);
router.get("/:id", verifyUser, getUser);

export default router;
