const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { INCORRECTEMAILORPASS_MSG, VALIDERROR_MSG } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: VALIDERROR_MSG,
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function findUserByCredentials({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized(INCORRECTEMAILORPASS_MSG));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized(INCORRECTEMAILORPASS_MSG));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
