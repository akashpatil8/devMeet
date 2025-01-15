const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  const { user } = req.body;

  try {
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
