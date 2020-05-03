import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Movie from "../models/Movie";
import { createResponse } from "../lib/utils";

export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, name, description } = req.body;
    const imageUrl = req.body["image-url"];
    const productionYear = req.body["production-year"];
    const movieGenre = req.body["movie-genre"];
    const data = await Movie.create({
      id,
      name,
      description,
      imageUrl,
      productionYear,
      movieGenre
    });
    res.status(201).json({ ...createResponse(data, req) });
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
    if (id) {
      const data = await Movie.readOne({ id });
      if (data) {
        data.movieGenre = data.movieGenre?.map(
          genre =>
            (genre = createResponse(
              genre,
              req,
              [{ rel: "self", href: `/genres/${genre.id}`, fromParent: false }],
              false
            ))
        );
        res
          .status(200)
          .json(
            createResponse(data, req, [
              { rel: "roles", href: "/roles", fromParent: true }
            ])
          );
      } else next({ status: 404, message: `Movie with id [${id}] not found.` });
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
    if (data && data.length) {
      data.forEach(
        item =>
          (item.movieGenre = item.movieGenre?.map(
            genre =>
              (genre = createResponse(
                genre,
                req,
                [
                  {
                    rel: "self",
                    href: `/genres/${genre.id}`,
                    fromParent: false
                  }
                ],
                false
              ))
          ))
      );

      res
        .status(200)
        .json(data.map((document: any) => createResponse(document, req)));
    } else next({ status: 404, message: "No Movies found." });
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
    if (data) res.status(200).json({ ...createResponse(data, req) });
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
