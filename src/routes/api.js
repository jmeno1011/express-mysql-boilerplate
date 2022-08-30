const express = require('express');
const logger = require('../config/winston');
const { authenticateAccessToken } = require('../models/jwt');
const route = express.Router();

route.get('/payload', authenticateAccessToken, (req, res) => {
  const id = req.decoded.id;
  return res
    .status(200)
    .send({ msg: '로그인 된 상태입니다.', data: { id: id } });
});

module.exports = route;
