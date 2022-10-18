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

  const { msg, id } = loginConfirm(user_id, user_pw);
  if (id === null) {
    return res.status(401).send({ state: 401, msg: msg, id: null });
  } else {
    let accessToken = generateAccessToken(id);
    let refreshToken = generateRefreshToken(id);

    res.cookie('access_token', accessToken, {
      maxAge: 1000 * 60 * 60, // 1시간
      httpOnly: true,
    });

    return res.status(200).send({
      state: 200,
      msg: msg,
      id: id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
});

route.get('/check', authenticateAccessToken, (req, res) => {
  const { id } = req.decoded;
  if (!id) {
    return res
      .send(401)
      .send({ state: 401, msg: '유효하지 않은 로그인 정보 입니다.' });
  }
  return res.status(200).send({ state: 200, id: id });
});

route.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).send({ code: 200, msg: '로그아웃 되었습니다.' });
});

module.exports = route;
