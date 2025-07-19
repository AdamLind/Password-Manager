const express = require("express");

const mongodb = require("./db/mongodb");
const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/", require("./routes"));

// 404 Error Handler - Must be after all other routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    statusCode: 404
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  
  // If response was already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong!",
    statusCode: err.status || 500
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
