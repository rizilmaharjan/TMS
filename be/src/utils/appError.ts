class appError extends Error {
  statusCode: number;
  data: unknown;
  isOperational: boolean;
  constructor(statusCode: number, message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { appError };
