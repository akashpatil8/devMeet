const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.get("/request", userAuth, async (req, res) => {
  const { user } = req.body;

  try {
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = requestRouter;
