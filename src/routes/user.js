const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.body.user;

    const connectionRequests = await ConnectionRequest.find({
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "about",
      "imageUrl",
    ]);

    res.send({ data: connectionRequests });
  } catch (error) {
    res.send(400).send({ message: "Error: " + error.message });
  }
});

module.exports = { userRouter };
