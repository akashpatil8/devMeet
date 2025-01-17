const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //created a new instance of the user model
  const { firstName, lastName, email, password, skills } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    if (skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      skills,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error while creating the user: " + err.message);
  }
});

//To login users
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Invalid credentials!");

    const isPasswordSame = await user.verifyPassword(password);

    if (isPasswordSame) {
      //Create JWT token
      const token = await user.getJWT();

      //Create a cookie for that token
      res.cookie("token", token);
      res.send("Login successful!!!...");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//To log user out
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logged out successfully!");
});

module.exports = authRouter;
