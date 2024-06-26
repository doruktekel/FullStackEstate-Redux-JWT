import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../helpers/pass.js";
import UserModel from "../models/userModel.js";
import ListModel from "../models/listModel.js";

const updateUser = expressAsyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    res.status(401);
    throw new Error("You can only update your account");
  }
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      },
    },
    {
      new: true,
    }
  );

  const { password: _, ...rest } = updatedUser._doc;
  res.status(200).json(rest);
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    res.status(401);
    throw new Error("You can only delete your own account!");
  }
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await UserModel.findByIdAndDelete(req.user.id);
  res.clearCookie("token").status(200).json("User has been deleted");
});

const getUserListings = expressAsyncHandler(async (req, res) => {
  if (req.user.id === req.params.id) {
    const lists = await ListModel.find({ userRef: req.user.id });

    if (!lists) {
      res.status(401);
      throw new Error("Can not find lists");
    }

    return res.status(200).json(lists);
  }

  res.status(401);
  throw new Error("You can only view your listings");
});

const getUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("list owner has not found !");
  }
  const { password: _, ...rest } = user._doc;

  res.status(200).json(rest);
});

export { updateUser, deleteUser, getUserListings, getUser };
