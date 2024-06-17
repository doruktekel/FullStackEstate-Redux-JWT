import { comparePassword, hashPassword } from "../helpers/pass.js";
import UserModal from "../models/userModel.js";
import validator from "validator";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Wrong email format");
  }

  const user = await UserModal.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("This email has been registered please login");
  }

  const trimmedUserName = username.trim();

  if (trimmedUserName.length < 3) {
    res.status(400);
    throw new Error("Username should be at least min 3 character");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    res.status(400);
    throw new Error(
      "Password is not strong enough. It should have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol."
    );
  }

  const hashedPassword = await hashPassword(password);
  await UserModal.create({
    username: trimmedUserName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Registration was successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModal.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isPassword = comparePassword(password, user.password);

  if (!isPassword) {
    res.status(400);
    throw new Error("Credentials are wrong");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  const { password: _, ...rest } = user._doc;

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 100,
    })
    .status(200)
    .json(rest);
});

export { register, login };
