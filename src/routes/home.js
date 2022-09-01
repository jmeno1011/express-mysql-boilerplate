const express = require('express');
const logger = require('../config/winston');
const { authenticateAccessToken } = require('../models/jwt');
const route = express.Router();

route.get('/', (req, res) => {
  logger.info("GET '/'");
  res.status(200).send('<h1>HOME</h1>');
});

route.get('/token', authenticateAccessToken, (req, res) => {
  const { id } = req.decoded;
  if (!id) {
    res
      .send(401)
      .send({
        code: 401,
        msg: '유효하지 않은 로그인 정보 입니다. \n토큰 테스트 실패',
      });
  }
  res.status(200).send({ code: 200, msg: '토큰 테스트 성공', id: id });
});

module.exports = route;
