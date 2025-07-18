const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

// Configure Swagger UI options
const options = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null, // Disable the validator
    tryItOutEnabled: true,
  }
};

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument, options));

module.exports = router;