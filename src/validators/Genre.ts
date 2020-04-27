import * as Genre from "../models/Genre";
import { body } from "express-validator";

export const validateGenreId = [
  body("id").custom(async (value: number) => {
    const data = await Genre.readOne({ id: value });
    if (!data) {
      return Promise.reject(`No genre matching id [${value}].`);
    } else return true;
  })
];
