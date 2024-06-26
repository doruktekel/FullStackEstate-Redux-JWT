import express from "express";
import {
  getList,
  listCreate,
  listDelete,
  listUpdate,
  getLists,
} from "../controllers/listController.js";
import verifyUser from "../middlewares/verify.js";

const router = express.Router();

router.post("/create", verifyUser, listCreate);
router.delete("/delete/:id", verifyUser, listDelete);
router.post("/update/:id", verifyUser, listUpdate);
router.get("/get/:id", getList);
router.get("/get", getLists);

export default router;
