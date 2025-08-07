const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        let isEmail = validator.isEmail(value);
        if (!isEmail) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Gender data is not proper");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about for the user",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 3) {
          throw new Error("Invalid skills!!!");
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.methods.getJWT = async function () {
  let user = this;
  const token = await jwt.sign({ userId: user._id }, "DEVTINDER@890");
  return token;
};

UserSchema.methods.comparePassword = function (password) {
  let user = this;
  let isValid = bcrypt.compareSync(password, user.password);
  return isValid;
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
