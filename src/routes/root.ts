import { Router, Request, Response, RequestHandler } from "express";

import { createResponse } from "../lib/utils";
import { errorHandler, Methods, notAllowed } from "../errors";

const router = Router();

const root: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const routes = ["genres", "movies", "actors"];
  res.status(200).json(
    createResponse(
      {},
      req,
      routes.map(route => {
        return { rel: route, href: route, fromParent: true };
      }),
      false
    )
  );
};

const notAllowedMethods: Methods[] = [
  Methods.POST,
  Methods.PUT,
  Methods.PATCH,
  Methods.DELETE
];

router.get("/", root, errorHandler);
notAllowed(router, "/", notAllowedMethods);

export default router;
