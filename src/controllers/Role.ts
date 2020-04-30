import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Role from "../models/Role";

import { createHATEOAS } from "../lib/utils";

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
    res.status(201).json({ ...data });
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
          createHATEOAS(
            document,
            req,
            [
              { rel: "movie", href: `/movies/${document["movie-id"]}` },
              { rel: "actor", href: `/actors/${document["actor-id"]}` }
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

    if (removed) res.status(200).json({ ...removed });
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
