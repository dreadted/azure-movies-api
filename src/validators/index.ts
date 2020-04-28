import { Request, Response, NextFunction } from "express";

import { check, body, param, validationResult } from "express-validator";

import { capitalize } from "../lib/utils";

export { validateGenreId } from "./Genre";
export { validateMovieId, validateMovie } from "./Movie";

export const validateId = [
  body("id").not().isEmpty().bail(),
  param("id").custom((value, { req }) => {
    if (parseInt(value) !== req.body.id)
      throw new Error(
        `Document id:s [${value}] and [${req.body.id}] don't match`
      );
    return true;
  })
];

export const validateName = [check("name").not().isEmpty()];

export const sanitizeName = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .customSanitizer(value => capitalize(value))
];

export const validationResponse = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) response.status(422).json({ errors: errors.array() });
  else next();
};
