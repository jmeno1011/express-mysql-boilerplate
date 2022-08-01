const express = require('express');
const logger = require('../config/winston');
const route = express.Router();

route.get('/', (req, res) => {
  logger.info("GET '/'");
  res.status(200).send('<h1>HOME</h1>');
});

module.exports = route;
