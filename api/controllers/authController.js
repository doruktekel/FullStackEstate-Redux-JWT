import { comparePassword, hashPassword } from "../helpers/pass.js";
import UserModel from "../models/userModel.js";
import validator from "validator";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Wrong email format");
  }

  const user = await UserModel.findOne({ email });

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
  await UserModel.create({
    username: trimmedUserName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Registration was successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

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

const google = asyncHandler(async (req, res) => {
  const { username, email, profilePicture } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    const { password: _, ...rest } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await hashPassword(generatedPassword);

    const user = await UserModel.create({
      username:
        username.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: hashedPassword,
      profilePicture,
    });

    const { password: _, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .status(200)
      .json(rest);
  }
});

const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json("User has been logout successfully");
});

export { register, login, google, logout };
