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
  const user_id = req.body.id;
  const user_pw = req.body.pw;

  const id = loginConfirm(user_id, user_pw);

  if (id === undefined) {
    return res
      .status(401)
      .send({ msg: '아이디 또는 비밀번호를 잘못입력하셨습니다.' });
  }

  let accessToken = generateAccessToken(id);
  let refreshToken = generateRefreshToken(id);

  res.cookie('user', accessToken, {
    httpOnly: true,
  });

  return res
    .status(200)
    .send({
      state: 200,
      id: id,
      msg: '로그인 되셨습니다.',
      act: accessToken,
      rfst: refreshToken,
    });
});

route.get('/check', authenticateAccessToken, (req, res) => {
  const { id } = req.decoded;
  if (!id) {
    res.send(401).send({ code: 401, msg: '유효하지 않은 로그인 정보 입니다.' });
  }
  res.status(200).send(id);
});

route.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).send({ code: 200, msg: '로그아웃 되었습니다.' });
});

module.exports = route;
