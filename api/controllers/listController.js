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

const listDelete = expressAsyncHandler(async (req, res) => {
  const list = await ListModel.findById(req.params.id);
  if (!list) {
    res.status(401);
    throw new Error("You have not list for deleting");
  }

  if (req.user.id !== list.userRef) {
    res.status(401);
    throw new Error("You can just delete your own lists");
  }

  await ListModel.findByIdAndDelete(req.params.id);

  res.status(200).json("Listing has been deleted ");
});

const listUpdate = expressAsyncHandler(async (req, res) => {
  const list = await ListModel.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error("List is not found");
  }

  if (req.user.id !== list.userRef) {
    res.status(401);
    throw new Error("You can only update your own lists");
  }

  await ListModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json("List updating successfully");
});

const getList = expressAsyncHandler(async (req, res) => {
  const list = await ListModel.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error("list is not found");
  }

  res.status(200).json(list);
});

export { listCreate, listDelete, listUpdate, getList };
