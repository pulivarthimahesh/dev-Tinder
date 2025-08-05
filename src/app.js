const express = require("express");
const { connectDB } = require("./config/mongodb");
const { userAuth } = require("./middlewares/user-auth");
const { User } = require("./models/User");

const app = express();
const PORT = 3000;

app.post("/user", async (req, res) => {
  let userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    email: "mahesh@gmail.com",
    password: "Mahesh@1234",
  };

  try {
    const user = new User(userObj);
    await user.save();
    res.send("User added successfully!!!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.use("/", (err, req, res, next) => {
  res.status(500).send(err.message);
});

connectDB()
  .then((res) => {
    console.log("Connected to DB successfully!!!");
    app.listen(PORT, () => {
      console.log(`Server is successfully running on ${PORT}...`);
    });
  })
  .catch((err) => console.log(err.message));
