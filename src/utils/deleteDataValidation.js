const validator = require("validator");

const deleteDataValidation = (req) => {
  const { email } = req.body;
  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid user!!!");
  }
};

module.exports = { deleteDataValidation };
