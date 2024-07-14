import { hashPassword } from "../helpers/pass.js";
import UserModel from "../models/userModel.js";
import ListModel from "../models/listModel.js";
import { handleError } from "../middlewares/errormiddleware.js";

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(handleError(401, "You can only update your account"));
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
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(handleError(401, "You can only update your account"));
  }
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    return next(handleError(404, "User not found"));
  }
  await UserModel.findByIdAndDelete(req.user.id);
  res.clearCookie("token").status(200).json("User has been deleted");
};

const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    const lists = await ListModel.find({ userRef: req.user.id });
    if (!lists) {
      return next(handleError(401, "Can not find lists"));
    }
    return res.status(200).json(lists);
  }
  return next(handleError(401, "You can only view your listings"));
};

const getUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return next(handleError(404, "list owner has not found !"));
  }
  const { password: _, ...rest } = user._doc;
  res.status(200).json(rest);
};

export { updateUser, deleteUser, getUserListings, getUser };
