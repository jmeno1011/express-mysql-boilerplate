const jwt = require('jsonwebtoken');
const logger = require('../config/winston');

// accessToken 발행
exports.generateAccessToken = (id) => {
  // ACCESS_TOKEN_SECRET=accesstoken
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

// refreshToken 발행
exports.generateRefreshToken = (id) => {
  // REFRESH_TOKEN_SECRET=refreshtoken
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '14 days',
  });
};

// accessToken 유효성 검사
exports.authenticateAccessToken = (req, res, next) => {
  const secretAccessToken = process.env.ACCESS_TOKEN_SECRET;
  console.log(req.headers);
  // console.log("req.headers.cookie::",req.headers.cookie);
  // console.log(req.headers.cookie.split(' ')[1]);

  // const token = req.headers.authorization.split(" ")[1];
  // console.log(token);

  // const token = req.cookies.user;
  // console.log(token);

  // console.log(req.headers.cookie);
  const token = req.headers.cookie.split('=')[1];
  // console.log(token);

  try {
    req.decoded = jwt.verify(token, secretAccessToken);
    console.log(req.decoded);
    return next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      logger.error(e.name);
      logger.error('토큰이 만료되었습니다.');
      // console.log(e);
      // console.log('토큰이 만료되어 유효하지 않습니다.');
      return res
        .status(419)
        .send({ code: 419, msg: '로그인 시간이 만료되었습니다' });
    }
    if (e.name === 'JsonWebTokenError') {
      logger.error(e.name);
      logger.error('토큰이 존재하지 않습니다.');
      // console.log('error');
      // console.log('토큰이 존재하지 않습니다.');
      return res
        .status(401)
        .send({ code: 401, msg: '유효하지 않은 로그인 정보 입니다.' });
    }
  }
};
