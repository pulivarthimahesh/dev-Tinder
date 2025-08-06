const validator = require("validator");

const signupDataValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is invalid!!!");
  }
  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!!!");
  }
};

module.exports = { signupDataValidation };
