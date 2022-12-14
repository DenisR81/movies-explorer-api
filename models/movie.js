const mongoose = require('mongoose');
const validator = require('validator');
const { VALIDERROR_MSG } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },

  director: {
    type: String,
    required: true,
    minlength: 2,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
    minlength: 2,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => VALIDERROR_MSG,
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => VALIDERROR_MSG,
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => VALIDERROR_MSG,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },

  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model('movie', movieSchema);
