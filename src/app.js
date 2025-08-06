const express = require("express");
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/mongodb");
const { userAuth } = require("./middlewares/user-auth");
const { User } = require("./models/User");
const { signupDataValidation } = require("./utils/signupDataValidation");
const { deleteDataValidation } = require("./utils/deleteDataValidation");
const {
  updateUserDataValidation,
} = require("./utils/updateUserDataValidation");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  } else {
    res.send("Login successfull!!!");
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    updateUserDataValidation(req);
    const userId = req.params.userId;
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      runValidators: true,
      returnDocument: "before",
    });
    if (user) {
      res.send("Updated successfully!!!");
    } else {
      throw new Error("User not found!!!");
    }
  } catch (err) {
    res.send("Something went wrong!!! " + err.message);
  }
});

app.get("/userByEmail", async (req, res) => {
  try {
    const users = await User.findOne({ email: req.body.email });
    if (users.length == 0) {
      res.send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.send("Something went wrong!!!");
  }
});

app.get("/userFeed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send("Something went wrong!!! " + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    signupDataValidation(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully!!!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    deleteDataValidation(req);

    const { email } = req.body;
    User.deleteOne({ email: email }).then((deleteRes) => {
      console.log(JSON.stringify(deleteRes));
      const { deletedCount } = deleteRes;
      if (deletedCount == 0) {
        res.send("Invalid user!!!");
      } else {
        res.send("Deleted successfully!!!");
      }
    });
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
