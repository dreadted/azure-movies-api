import { Request, Response, NextFunction, RequestHandler } from "express";
import * as Actor from "../models/Actor";
import { createResponse } from "../lib/utils";

export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const firstName = req.body["first-name"];
    const lastName = req.body["last-name"];
    const data = await Actor.create({ firstName, lastName });
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
      const data = await Actor.readOne({ id });
      if (data)
        res
          .status(200)
          .json(
            createResponse(data, req, [
              { rel: "roles", href: "/roles", fromParent: true }
            ])
          );
      else next({ status: 404, message: `Actor with id [${id}] not found.` });
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
    const data = await Actor.readAll();
    if (data && data.length)
      res
        .status(200)
        .json(
          data.map((document: Actor.Actor) =>
            createResponse(document, req, [
              { rel: "roles", href: "/roles", fromParent: true }
            ])
          )
        );
    else next({ status: 404, message: "No actors found." });
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
    const firstName = req.body["first-name"];
    const lastName = req.body["last-name"];

    const data = await Actor.update({
      id,
      firstName,
      lastName
    });
    if (data) res.status(200).json({ ...createResponse(data, req) });
    else next({ status: 404, message: `Actor with id [${id}] not found.` });
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
    const removed = await Actor.remove({ id });

    if (removed) res.status(200).json({ ...removed });
    else next({ status: 404, message: `Actor with id [${id}] not found.` });
  } catch (err) {
    next(err);
  }
  next();
};
