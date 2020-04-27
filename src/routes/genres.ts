import { Router } from "express";
import * as Genre from "../controllers/Genre";
import {
  validateName,
  validateId,
  sanitizeName,
  validationResponse,
  validateGenreId
} from "../validators";
import errorHandler from "../errors";

const router = Router();

router.post(
  "/",
  validateName,
  sanitizeName,
  validationResponse,
  Genre.create,
  errorHandler
);

router.get("/:id([0-9]+)", Genre.readOne, errorHandler);

router.get("/", Genre.readAll, errorHandler);

router.put(
  "/:id([0-9]+)",
  validateGenreId,
  validateName,
  sanitizeName,
  validationResponse,
  Genre.update,
  errorHandler
);

router.delete(
  "/:id([0-9]+)",
  validateGenreId,
  validationResponse,
  Genre.remove,
  errorHandler
);

export default router;
