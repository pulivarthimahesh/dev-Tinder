const userAuth = (req, res, next) => {
  let token = "xyz";
  if (token == "xyza") {
    next();
  } else {
    res.status(401).send("Unauthorized!!!");
  }
};

module.exports = { userAuth };
