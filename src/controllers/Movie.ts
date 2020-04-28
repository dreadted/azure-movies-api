import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Movie from "../models/Movie";
import { addHATEOASLinks } from "../lib/utils";

export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input = req.body;
    const data = await Movie.create(input);
    res.status(201).json({ ...data });
  } catch (err) {
    next(err);
  }
  next();
};

export const readOne: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const url = req.originalUrl.slice(0, req.originalUrl.lastIndexOf("/"));
    if (id) {
      const data = await Movie.readOne({ id });
      if (data) res.status(200).json(addHATEOASLinks(data, url));
      else next({ status: 404, message: `Movie with id [${id}] not found.` });
    }
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
    const data = await Movie.readAll();
    if (data && data.length)
      res
        .status(200)
        .json(
          data.map((record: any) => addHATEOASLinks(record, req.originalUrl))
        );
    else next({ status: 404, message: "No Movies found." });
  } catch (err) {
    next(err);
  }
  next();
};

export const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const input = req.body;

    const data = await Movie.update(input);
    if (data) res.status(200).json({ ...data });
    else next({ status: 404, message: `Movie with id [${id}] not found.` });
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
    const id = parseInt(req.params.id);
    if (!id) next({ status: 400, message: "ID is blank!" });
    const removed = await Movie.remove({ id });

    if (removed) res.status(200).json({ ...removed });
    else next({ status: 404, message: `Movie with id [${id}] not found.` });
  } catch (err) {
    next(err);
  }
  next();
};
