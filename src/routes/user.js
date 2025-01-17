const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "imageUrl",
  "skills",
];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.body.user;

    const connectionRequests = await ConnectionRequest.find({
      status: "interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", USER_SAFE_DATA);

    res.send({ data: connectionRequests });
  } catch (error) {
    res.send(400).send({ message: "Error: " + error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.body.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("toUserId", USER_SAFE_DATA)
      .populate("fromUserId", USER_SAFE_DATA);

    const data = connections.map((connection) => {
      if (
        connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });

    res.send({ data });
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.body.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select(["fromUserId", "toUserId", "status"]);

    const hideUsersFromFeed = new Set();
    connectionRequests.map((connection) => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $nin: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(page)
      .limit(limit);

    res.json({ users });
  } catch (error) {
    res.status(400).json({ message: "Error: " + error.message });
  }
});

module.exports = { userRouter };
