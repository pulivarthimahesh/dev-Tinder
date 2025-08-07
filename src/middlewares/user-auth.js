const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid jwt token!!!");
    } else {
      var decoded = jwt.verify(token, "DEVTINDER@890", { expiresIn: "1d" });
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error("User not found!!!");
      }
      req.user = user;
      next();
    }
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
