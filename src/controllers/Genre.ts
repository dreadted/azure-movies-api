import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Genre from "../models/Genre";

export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input = req.body;
    const data = await Genre.create(input);
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
    if (id) {
      const data = await Genre.readOne({ id });
      if (data) res.status(200).json({ ...data });
      else next({ status: 404, message: `Genre with id [${id}] not found.` });
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
    const data = await Genre.readAll();
    if (data && data.length) res.status(200).json(data);
    else next({ status: 404, message: "No genres found." });
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

    const data = await Genre.update({ id, name: input.name });
    if (data) res.status(200).json({ ...data });
    else next({ status: 404, message: `Category with id [${id}] not found.` });
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
    const removed = await Genre.remove({ id });

    if (removed && removed.id) res.status(200).json({ id });
    else next({ status: 404, message: `Category with id [${id}] not found.` });
  } catch (err) {
    next(err);
  }
  next();
};
