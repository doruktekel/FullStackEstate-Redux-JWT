import { hashPassword } from "../helpers/pass.js";
import UserModal from "../models/userModel.js";
import validator from "validator";
import asyncHandler from "express-async-handler";

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

export { register };
