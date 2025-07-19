const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  // # swagger.tags = ["Hello World!"];
  res.send("Hello World! Navigate to /api-docs to view the API documentation.");
});

router.use("/logins", require("./logins"));
router.use("/personal_info", require("./personalInfo"));

// 404 Handler - Must be last route
router.use("*", (req, res) => {
  res.send(
    "This route does not exist. Please check the API documentation for available routes."
  );
});

module.exports = router;
