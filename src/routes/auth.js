const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //created a new instance of the user model
  try {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const token = await user.getJWT();
    res.cookie("token", token);

    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//To login users
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Invalid credentials!");

    const isPasswordSame = await user.verifyPassword(password);

    if (isPasswordSame) {
      //Create JWT token
      const token = await user.getJWT();

      //Create a cookie for that token
      res.cookie("token", token);
      res.send({ user });
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//To log user out
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("User logged out successfully!");
});

module.exports = authRouter;
