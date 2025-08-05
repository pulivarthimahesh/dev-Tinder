const express = require("express");
const { connectDB } = require("./config/mongodb");
const { userAuth } = require("./middlewares/user-auth");
const { User } = require("./models/User");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
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
