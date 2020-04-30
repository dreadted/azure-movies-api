import { Router, Request, Response, RequestHandler } from "express";

import { createHATEOAS } from "../lib/utils";
import errorHandler from "../errors";

const router = Router();

const root: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const routes = ["genres", "movies", "actors"];
  res.status(200).json(
    createHATEOAS(
      {},
      req,
      routes.map(route => {
        return { rel: route, href: route, fromParent: true };
      }),
      false
    )
  );
};

router.get("/", root, errorHandler);

export default router;
