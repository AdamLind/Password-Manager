const validateContactData = (req, res, next) => {
  const newContact = req.body;

  // Check if the request body is empty
  if (!newContact || Object.keys(newContact).length === 0) {
    return res
      .status(400)
      .json({ error: "Request body is required and cannot be empty" });
  }

  // Validate required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "birthday",
  ];
  for (const field of requiredFields) {
    if (!newContact[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  // Additional validation can be added here

  next();
};

module.exports = {
  validateContactData,
};
