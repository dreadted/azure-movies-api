import {
  Request,
  RequestHandler,
  Response,
  NextFunction,
  Router
} from "express";
import { errorHandler } from "./errorHandler";

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

const notAllowedHandler = (...allowed: string[]) => {
  const handler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const _allowed: string = allowed.join(", ").toUpperCase();
    res.append("Access-Control-Allow-Methods", _allowed);
    next({
      status: 405,
      message: `Following method(s) are allowed: ${_allowed}`
    });
  };
  return handler;
};

export const notAllowed = (
  router: Router,
  path: string,
  notAllowedMethods: Methods[]
) => {
  const allowed = Object.values(Methods).filter(
    value => !notAllowedMethods.includes(value)
  );
  notAllowedMethods.forEach(method =>
    router[method](path, notAllowedHandler(...allowed), errorHandler)
  );
};
