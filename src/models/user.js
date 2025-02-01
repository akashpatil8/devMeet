const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },

    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Invalid email: " + value);
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Please enter a strong passsword");
      },
    },

    age: { type: Number, min: 18, trim: true },

    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["Male", "Female", "Other"].includes(value)) {
          throw new Error("Gender not valid");
        }
      },
    },

    about: {
      type: String,
      minLength: 20,
      default: "This is the default description",
    },

    imageUrl: {
      type: String,
      default:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Invalid image url");
      },
    },

    skills: { type: [String] },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET_STRING, {
    expiresIn: "2d",
  });
  return token;
};

userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  const passswordHash = this.password;

  const isPasswordVerified = await bcrypt.compare(
    userEnteredPassword,
    passswordHash
  );

  return isPasswordVerified;
};

const user = mongoose.model("User", userSchema);

module.exports = user;
