import { Router } from "express";
import * as Genre from "../controllers/Genre";
import {
  validateName,
  sanitizeName,
  validationResponse,
  validateGenreId
} from "../validators";
import { errorHandler, Methods, notAllowed } from "../errors";

const router = Router();

// POST
router.post(
  "/",
  validateName("name"),
  sanitizeName("name"),
  validationResponse,
  Genre.create,
  errorHandler
);

// GET
router.get("/:id([0-9]+)", Genre.readOne, errorHandler);
router.get("/", Genre.readAll, errorHandler);

// PUT
router.put(
  "/:id([0-9]+)",
  validateGenreId,
  validateName("name"),
  sanitizeName("name"),
  validationResponse,
  Genre.update,
  errorHandler
);

// DELETE
router.delete(
  "/:id([0-9]+)",
  validateGenreId,
  validationResponse,
  Genre.remove,
  errorHandler
);

// Methods not allowed
notAllowed(router, "/", [Methods.PUT, Methods.PATCH, Methods.DELETE]);
notAllowed(router, "/:id([0-9]+)", [Methods.POST, Methods.PATCH]);

export default router;
