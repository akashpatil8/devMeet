const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const { _id: fromUserId } = req.body.user;
      const { status, userId: toUserId } = req.params;

      const toUser = await User.findById({ _id: toUserId });
      if (!toUser)
        return res.status(404).send({ message: "User is not present." });

      if (fromUserId.toString() === toUserId)
        throw new Error("Cannot send connection request to yourself");

      const existingConnectionRequest = await ConnectionRequest.find({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest.length)
        throw new Error("Connection request already exists!");

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.send({ data });
    } catch (error) {
      res.status(400).send({ message: "Error: " + error.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.body.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        throw new Error("Connection status not allowed");

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest)
        return res
          .status(404)
          .send({ message: "Error: Connection request not found!" });

      connectionRequest.status = status;

      await connectionRequest.save();

      res.send({ data: connectionRequest });
    } catch (error) {
      res.status(400).send({ message: "Error: " + error.message });
    }
  }
);

module.exports = requestRouter;
