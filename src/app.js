const express = require("express");
const app = express();
const PORT = 3000;

app.use("/user", [
  (req, res, next) => {
    console.log("Handling user from user 1");
    // res.send("Handling user from user 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling user from user 2");
    // res.send("Handling user from user 2");
    next();
  },
  (req, res, next) => {
    console.log("Handling user from user 3");
    // res.send("Handling user from user 3");
    next();
  },
  (req, res, next) => {
    console.log("Handling user from user 4");
    // res.send("Handling user from user 4");
    next();
  },
  (req, res, next) => {
    try {
      console.log("Handling user from user 5");
      // res.send("Handling user from user 5");
      throw new Error("Something went wrong!");
    } catch (err) {
      res.send(err.message);
    }
  },
]);

app.use("/", (err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on ${PORT}...`);
});
