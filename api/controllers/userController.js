import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../helpers/pass.js";
import UserModel from "../models/userModel.js";

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

export { updateUser };
