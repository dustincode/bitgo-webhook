const express = require('express');

const bitgo = require('./bitgo');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/bitgo', bitgo);

module.exports = router;
