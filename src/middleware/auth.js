const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not valid!");

    const decodedTokenData = await jwt.verify(token, "Akash@10598");

    const user = await User.findById(decodedTokenData._id);
    if (user) {
      //Adding user data to the req body
      req.body.user = user;
      next();
    } else {
      throw new Error("User does not exists");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = { userAuth };
