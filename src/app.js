const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//Get the profile of the user

//Get all the users from the database
// app.get("/feed", userAuth, async (req, res) => {
//   try {
//     const userList = await User.find({});
//     if (userList.length === 0) {
//       res.status(404).send("Users not found!");
//     } else {
//       res.send(userList);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

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
