const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //created a new instance of the user model
  const userData = req.body;
  const user = new User(userData);

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error while saving the user:", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connection successfully established");
    app.listen(3000, () => {
      console.log("Listening to port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
