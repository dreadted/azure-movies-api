import * as Movie from "../models/Movie";
import { body, checkSchema } from "express-validator";

export const validateMovieId = [
  body("id").custom(async (value: number) => {
    const data = await Movie.readOne({ id: value });
    if (!data) {
      return Promise.reject(`No Movie matching id [${value}].`);
    } else return true;
  })
];

export const validateMovie = checkSchema({
  id: {
    in: ["params", "body"],
    errorMessage: "Incorrect id.",
    toInt: true
  },
  description: {
    in: ["body"],
    errorMessage: "Incorrect description",
    isLength: {
      errorMessage: "Description must be at least 10 characters long.",
      options: { min: 10 }
    }
  },
  "image-url": { in: ["body"], isURL: { errorMessage: "Incorrect image URL" } },
  "production-year": {
    errorMessage: "Year must be between 1800 and 2100.",
    isInt: { options: { min: 1800, max: 2100 } }
  }
});
