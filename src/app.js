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
    res.status(400).send("Error while saving the user:" + err.message);
  }
});

//Get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const userList = await User.find({});
    if (userList.length === 0) {
      res.status(404).send("Users not found!");
    } else {
      res.send(userList);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//To get users by there email address
app.get("/users", async (req, res) => {
  const { email } = req.body;
  try {
    const users = await User.find({ email: email });
    if (users.length === 0) {
      res.status(400).send("Users not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

//To get a user by ID
app.get("/getUserById", async (req, res) => {
  const { id } = req.body;

  try {
    const usersById = await User.findById({ _id: id });

    res.send(usersById);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

//To get user by id and then delete it
app.delete("/users", async (req, res) => {
  const { id } = req.body;

  try {
    // await User.findOneAndDelete({ _id: id });
    const user = await User.findByIdAndDelete(id);
    console.log(user);

    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

//To get an user by id and update it
app.patch("/users", async (req, res) => {
  const { id, update } = req.body;

  try {
    await User.findByIdAndUpdate(id, update);

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!");
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
