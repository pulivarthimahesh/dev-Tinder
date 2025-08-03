const express = require("express");
const app = express();
const PORT = 3000;

app.use("/hello", (req, res) => {
  res.send("Hello from hello!!!");
});

app.use("/test", (req, res) => {
  res.send("Hello from test!!!");
});

app.use("/", (req, res) => {
  res.send("Hello from server!!!");
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on ${PORT}...`);
});
