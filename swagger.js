const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "logins API",
    description: "API for managing logins",
    version: "1.0.0",
  },
  host: "https://password-manager-ywae.onrender.com/",
  schemes: ["https"],
  definitions: {
    login: {
      _id: "507f1f77bcf86cd799439011",
      website: "gmail.com",
      username: "john.doe@example.com",
      password: "securePassword123",
      title: "Gmail Account",
      notes: "My main email account",
    },
    loginInput: {
      website: "gmail.com",
      username: "john.doe@example.com",
      password: "securePassword123",
      title: "Gmail Account",
      notes: "My main email account",
    },
    personalInfo: {
      _id: "507f1f77bcf86cd799439011",
      type: "passport",
      number: "AB1234567",
      name: "John Doe",
      expiryDate: "2030-12-31",
      issuingAuthority: "US Department of State",
      notes: "Renewed in 2024",
      isActive: true,
    },
    personalInfoInput: {
      type: "passport",
      number: "AB1234567",
      name: "John Doe",
      expiryDate: "2030-12-31",
      issuingAuthority: "US Department of State",
      notes: "Renewed in 2024",
      isActive: true,
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
