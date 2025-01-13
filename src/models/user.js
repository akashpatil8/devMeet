const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },

    lastName: { type: String, minLength: 3, maxLength: 50, trim: true },

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
      minLength: 100,
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

const user = mongoose.model("User", userSchema);

module.exports = user;
