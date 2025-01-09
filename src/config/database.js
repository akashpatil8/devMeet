const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://akashpatil8:rrZUGPkQMuHewvu6@akashpatil.9cnc1.mongodb.net/devMeet`
  );
};

module.exports = connectDB;
