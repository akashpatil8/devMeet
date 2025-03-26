const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", requestRouter);
app.use("/api", userRouter);

// Catch-all route to serve `index.html`
app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(__dirname, "dist", "index.html"), {
    cacheControl: false,
  });
});

connectDB()
  .then(() => {
    console.log("connection successfully established");
    app.listen(process.env.PORT, () => {
      console.log("Listening to port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
