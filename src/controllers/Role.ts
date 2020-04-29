import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Role from "../models/Role";

import { addHATEOASLinks, parentURL } from "../lib/utils";

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

export const readOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const actorId = parseInt(req.params.actorId);
    const movieId = parseInt(req.params.movieId);
    const data = await Role.readAll({ actorId, movieId });
    if (data && data.length)
      res
        .status(200)
        .json(
          data.map((record: any) =>
            addHATEOASLinks(record, req.headers.host + req.originalUrl)
          )
        );
    else next({ status: 404, message: "No genres found." });
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
        data.map((record: any) =>
          addHATEOASLinks(record, req.headers.host + req.originalUrl, [
            {
              _rel: "movie",
              type: "GET",
              href: `${parentURL(
                req.headers.host + req.originalUrl,
                2
              )}/movies/${record["movie-id"]}`
            },
            {
              _rel: "actor",
              type: "GET",
              href: `${parentURL(req.headers.host + req.originalUrl, 0)}`
            }
          ])
        )
      );
    else next({ status: 404, message: "No genres found." });
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
    // if (!id) next({ status: 400, message: "ID is blank!" });
    const removed = await Role.remove({ movieId, actorId });

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
