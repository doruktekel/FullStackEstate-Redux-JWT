import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username should be at least min 3 character"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "Password is not strong enough. It should have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.",
      },
    },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const UserModal = mongoose.model("UserModal", UserSchema);

export default UserModal;
