const mongoose = require("mongoose");
const connectDB = async () => {
  return await mongoose.connect(
    "mongodb+srv://pulivarthi_mahesh:tn1Uzkdn1uWTlB4L@cluster0.yflcz.mongodb.net/devTinder1"
  );
};

module.exports = { connectDB };
