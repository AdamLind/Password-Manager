const { body, validationResult } = require("express-validator");

const personalInfoValidationRules = [
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn([
      "passport",
      "license",
      "ssn",
      "id_card",
      "birth_certificate",
      "visa",
      "other",
    ])
    .withMessage(
      "Type must be one of: passport, license, ssn, id_card, birth_certificate, visa, other"
    ),
  body("number").notEmpty().withMessage("Number is required").trim(),
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid date (YYYY-MM-DD)"),
  body("issuingAuthority").optional().trim(),
  body("notes").optional().trim(),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

const validatePersonalInfoData = (req, res, next) => {
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
  personalInfoValidationRules,
  validatePersonalInfoData,
};
