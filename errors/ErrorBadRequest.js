const { BADREQUEST_CODE } = require('../utils/constants');

class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BADREQUEST_CODE;
  }
}

module.exports = ErrorBadRequest;
