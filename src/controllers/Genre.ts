import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Genre from "../models/Genre";

export const hello: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.send("Hello from Genre!");
  // next({ status: 404, message: "Oops!" });
  next(Error("Hoppsan!"));
};

export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input = req.body;
    const data = await Genre.create(input);
    res.status(201).json({ ...data });
  } catch (error) {
    next(error);
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
      const data = await Genre.readOne({ id });
      if (data) res.status(200).json({ ...data });
      else next({ status: 404, message: `Genre with id ${id} not found.` });
    }
  } catch (error) {
    next(error);
  }
  next();
};

export const readAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Genre.readAll();
    if (data && data.length) res.status(200).json(data);
    else next({ status: 404, message: "No genres found." });
  } catch (error) {
    next(error);
  }
  next();
};

export const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const input = req.body;

    const data = await Genre.update(input);
    if (data) res.status(200).json({ ...data });
    else next({ status: 404, message: `Category with id ${id} not found.` });
  } catch (error) {
    next(error);
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
    const removed = await Genre.remove({ id });

    if (removed.id) res.status(200).json({ id });
    else next(Error("No category deleted."));
  } catch (error) {
    next(error);
  }
  next();
};
