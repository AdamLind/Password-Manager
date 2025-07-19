const { body, validationResult } = require("express-validator");

const loginValidationRules = [
  body("website")
    .notEmpty()
    .withMessage("Website is required")
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,})+$/)
    .withMessage("Website must be a valid domain name (e.g., gmail.com)"),
  body("username").notEmpty().withMessage("Username is required").trim(),
  body("password").notEmpty().withMessage("Password is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("notes").optional().trim(),
];

const validateLoginData = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  console.log(
    "Raw validation errors:",
    JSON.stringify(errors.array(), null, 2)
  );

  const extractedErrors = errors.array().map((err) => {
    console.log("Processing error:", err);
    return {
      field: err.path || err.param || err.location || "unknown",
      message: err.msg,
    };
  });

  console.log("Extracted errors:", extractedErrors);

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  loginValidationRules,
  validateLoginData,
};
