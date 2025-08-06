const updateUserDataValidation = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "gender",
    "skills",
    "password",
  ];
  const isAllowed = Object.keys(req.body).every((k) =>
    allowedFields.includes(k)
  );

  if (!isAllowed) {
    throw new Error("Invalid update!!!");
  }
};

module.exports = { updateUserDataValidation };
