import expressAsyncHandler from "express-async-handler";
import ListModel from "../models/listModel.js";

const listCreate = expressAsyncHandler(async (req, res) => {
  const list = await ListModel.create(req.body);
  if (!list) {
    res.status(400);
    throw new Error("List not created");
  }
  res.status(200).json(list);
});

export { listCreate };
