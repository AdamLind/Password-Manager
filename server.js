const express = require('express');

const mongodb = require('./db/mongodb');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));



mongodb.initDb((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
