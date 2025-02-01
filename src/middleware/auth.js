const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Please login!" });

    const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET_STRING);

    const user = await User.findById(decodedTokenData._id);
    if (user) {
      //Adding user data to the req body
      req.body.user = user;
      next();
    } else {
      return res.status(404).json({ message: "User does not exists" });
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = { userAuth };
