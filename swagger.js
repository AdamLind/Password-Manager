const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
    version: "1.0.0",
  },
  host: "cse341-project1-2mtq.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
