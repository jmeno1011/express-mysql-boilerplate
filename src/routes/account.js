const express = require('express');
const logger = require('../config/winston');
const route = express.Router();
const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateAccessToken,
} = require('../models/jwt');
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

  res.cookie('user', accessToken, {
    httpOnly: true,
  });

  return res
    .status(200)
    .send({ msg: '로그인 되셨습니다.', act: accessToken, rfst: refreshToken });
});

route.get('/check', authenticateAccessToken, (req, res) => {
  const { id } = req.decoded;
  if (!id) {
    res.send(401).send({ code: 401, msg: '유효하지 않은 로그인 정보 입니다.' });
  }
  return;
});

route.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).send({ code: 200, msg: '로그아웃 되었습니다.' });
});

module.exports = route;
