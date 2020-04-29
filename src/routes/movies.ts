import { Router } from "express";
import * as Movie from "../controllers/Movie";
import * as Role from "../controllers/Role";

import {
  validateName,
  validateId,
  validationResponse,
  validateMovie
} from "../validators";
import errorHandler from "../errors";

const router = Router();

// POST
router.post(
  "/",
  validateName("name"),
  validateMovie,
  validationResponse,
  Movie.create,
  errorHandler
);

// GET
router.get("/", Movie.readAll, errorHandler);
router.get("/:id([0-9]+)", Movie.readOne, errorHandler);
router.get("/:movieId([0-9]+)/roles", Role.readAll, errorHandler);

router.put(
  "/:id([0-9]+)",
  validateId,
  validateName("name"),
  validateMovie,
  validationResponse,
  Movie.update,
  errorHandler
);

router.delete("/:id([0-9]+)", Movie.remove, errorHandler);

export default router;
