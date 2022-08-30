const jwt = require('jsonwebtoken');

exports.generateAccessToken = (id) => {
  // ACCESS_TOKEN_SECRET=accesstoken
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

exports.generateRefreshToken = (id) => {
  // REFRESH_TOKEN_SECRET=refreshtoken
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '14 days',
  });
};
