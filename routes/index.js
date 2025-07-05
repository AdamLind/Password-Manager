const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello, World! Navigate to /contacts to see the contacts API. You can also use /contacts/:id to get a specific contact by ID.');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
