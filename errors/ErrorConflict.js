const { CONFLICT_CODE } = require('../utils/constants');

class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_CODE;
  }
}

module.exports = ErrorConflict;
