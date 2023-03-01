class appError extends Error {
  constructor(message, statusCode) {
    super(message); //acceder a la funcion message del padre(Error)

    this.statusCode = statusCode;

    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'failure';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = appError;
