import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Role from "../models/Role";

import { createResponse } from "../lib/utils";

export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieId = parseInt(req.params.movieId);
    const actorId = parseInt(req.params.actorId);
    const { name } = req.body;
    const data = await Role.create({ name, movieId, actorId });
    res.status(201).json({
      ...createResponse(
        data,
        req,
        [
          { rel: "movie", href: `/movies/${data.movieId}` },
          { rel: "actor", href: `/actors/${data.actorId}` }
        ],
        false
      )
    });
  } catch (err) {
    next(err);
  }
  next();
};

export const readAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const actorId = parseInt(req.params.actorId);
    const movieId = parseInt(req.params.movieId);
    const data = await Role.readAll({ movieId, actorId });
    if (data && data.length)
      res.status(200).json(
        data.map((document: any) =>
          createResponse(
            document,
            req,
            [
              { rel: "movie", href: `/movies/${document.movieId}` },
              { rel: "actor", href: `/actors/${document.actorId}` }
            ],
            false
          )
        )
      );
    else next({ status: 404, message: "No roles found." });
  } catch (err) {
    next(err);
  }
  next();
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieId = parseInt(req.params.movieId);
    const actorId = parseInt(req.params.actorId);
    const id = parseInt(req.params.roleId);
    const removed = await Role.remove({ movieId, actorId, id });

    if (removed)
      res.status(200).json({
        ...createResponse(
          removed,
          req,
          [
            { rel: "movie", href: `/movies/${removed.movieId}` },
            { rel: "actor", href: `/actors/${removed.actorId}` }
          ],
          false
        )
      });
    else
      next({
        status: 404,
        message: `Role with movieId [${movieId}] and actorId [${actorId}] not found.`
      });
  } catch (err) {
    next(err);
  }
  next();
};
