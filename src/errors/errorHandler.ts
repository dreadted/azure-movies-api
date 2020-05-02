import { Request, Response, NextFunction } from "express";

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (
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
