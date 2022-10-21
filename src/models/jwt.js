const jwt = require('jsonwebtoken');
const logger = require('../config/winston');

// env파일 대신 선언
const ACCESS_TOKEN_SECRET = "access_token";
const REFRESH_TOKEN_SECRET = "refresh_token"

// accessToken 발행
exports.generateAccessToken = (id) => {
  // ACCESS_TOKEN_SECRET=accesstoken
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

// refreshToken 발행
exports.generateRefreshToken = (id) => {
  // REFRESH_TOKEN_SECRET=refreshtoken
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: '14 days',
  });
};

// accessToken 유효성 검사
exports.authenticateAccessToken = (req, res, next) => {
  const secretAccessToken = ACCESS_TOKEN_SECRET;
  const token = req.headers.cookie;
  // accessToken 확인
  // console.log("token::",token);

  if (!token) return next();
  try {
    // jwt 토큰 해석
    req.decoded = jwt.verify(token.split('=')[1], secretAccessToken);
    // console.log("req.decoded::",req.decoded); // {id: id, iat: 1666076924, exp: 1666080524 }
    logger.info('try jwt.verify');
    return next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      logger.error(e.name);
      logger.error('토큰이 만료되었습니다.');
      return res
        .status(419)
        .send({ code: 419, msg: '로그인 시간이 만료되었습니다' });
    }
    if (e.name === 'JsonWebTokenError') {
      logger.error(e.name);
      logger.error('토큰이 존재하지 않습니다.');
      return res
        .status(401)
        .send({ code: 401, msg: '유효하지 않은 로그인 정보 입니다.' });
    }
  }
};
