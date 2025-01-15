const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //created a new instance of the user model
  const { firstName, lastName, email, password, skills } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    if (skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error while creating the user: " + err.message);
  }
});

//To login users
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Invalid credentials!");

    const isPasswordSame = await user.verifyPassword(password);

    if (isPasswordSame) {
      //Create JWT token
      const token = await user.getJWT();

      //Create a cookie for that token
      res.cookie("token", token);
      res.send("Login successful!!!...");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//Get the profile of the user
app.get("/profile", userAuth, async (req, res) => {
  const { user } = req.body;

  try {
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//Get all the users from the database
app.get("/feed", userAuth, async (req, res) => {
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
app.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  const VALIDATION_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "imageUrl",
    "skills",
    "gender",
  ];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      VALIDATION_FIELDS.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    if (data.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10.");
    }

    await User.findByIdAndUpdate(userId, data);

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update Error: " + error.message);
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
