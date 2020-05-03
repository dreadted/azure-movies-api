import { Router } from "express";
import * as Movie from "../controllers/Movie";
import * as Role from "../controllers/Role";

import {
  validateName,
  validateId,
  validationResponse,
  validateMovie
} from "../validators";
import { errorHandler, Methods, notAllowed } from "../errors";

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

// PUT
router.put(
  "/:id([0-9]+)",
  validateId,
  validateName("name"),
  validateMovie,
  validationResponse,
  Movie.update,
  errorHandler
);

// DELETE
router.delete("/:id([0-9]+)", Movie.remove, errorHandler);

// Methods not allowed
notAllowed(router, "/", [Methods.PUT, Methods.PATCH, Methods.DELETE]);
notAllowed(router, "/:id([0-9]+)", [Methods.POST, Methods.PATCH]);
notAllowed(router, "/:movieId([0-9]+)/roles", [
  Methods.POST,
  Methods.PUT,
  Methods.PATCH,
  Methods.DELETE
]);

export default router;
