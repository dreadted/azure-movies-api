import { Request, Response, NextFunction, RequestHandler } from "express";

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong.";
  res.status(status).json({ errors: { msg: message } });
};

export default errorHandler;
