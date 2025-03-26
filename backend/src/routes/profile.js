const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateProfileEditFields } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const { user } = req.body;

  try {
    res.json({ user });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.body.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({ user: loggedInUser });
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const userEnteredPassword = req.body.password;
    const loggedInUser = req.body.user;

    const passwordHash = await bcrypt.hash(userEnteredPassword, 10);

    loggedInUser.password = passwordHash;
    await loggedInUser.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json("Error: " + error.message);
  }
});

module.exports = profileRouter;
