const jwt = require('jsonwebtoken');
const { secretTokenKey } = require('../utils/config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { AUTHREQUIRED_MSG } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ErrorUnauthorized(AUTHREQUIRED_MSG);
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV !== 'production' ? secretTokenKey : JWT_SECRET,
    );
  } catch (err) {
    res.clearCookie('jwt');
    next(new ErrorUnauthorized(AUTHREQUIRED_MSG));
  }

  req.user = payload;
  next();
};
