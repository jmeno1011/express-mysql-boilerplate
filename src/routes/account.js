const express = require('express');
const logger = require('../config/winston');
const route = express.Router();
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../models/jwt');
const { loginConfirm } = require('../models/loginConfirm');

route.post('/login', (req, res, next) => {
  const id = req.body.id;
  const pw = req.body.pw;

  const user = loginConfirm(id, pw);

  if (user === undefined) {
    return res
      .status(401)
      .send({ msg: '아이디 또는 비밀번호를 잘못입력하셨습니다.' });
  }

  let accessToken = generateAccessToken(user);
  let refreshToken = generateRefreshToken(user);

  return res
    .status(200)
    .send({ msg: '로그인 되셨습니다.', act: accessToken, rfst: refreshToken });
});

module.exports = route;
