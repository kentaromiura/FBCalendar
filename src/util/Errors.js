var format = require('./substitute'),
  Errors = {
    GenericError: function GenericError(reason, params) {
      return new Error(format(reason, params))
    }
  }

module.exports = Errors
