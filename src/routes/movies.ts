import { Router } from "express";
import * as Movie from "../controllers/Movie";
import {
  validateName,
  validateId,
  validationResponse,
  validateMovie
} from "../validators";
import errorHandler from "../errors";

const router = Router();

router.post(
  "/",
  validateName,
  validateMovie,
  validationResponse,
  Movie.create,
  errorHandler
);

router.get("/:id([0-9]+)", Movie.readOne, errorHandler);

router.get("/", Movie.readAll, errorHandler);

router.put(
  "/:id([0-9]+)",
  validateId,
  validateName,
  validateMovie,
  validationResponse,
  Movie.update,
  errorHandler
);

router.delete("/:id([0-9]+)", validationResponse, Movie.remove, errorHandler);

export default router;
