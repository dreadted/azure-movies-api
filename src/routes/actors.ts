import { Router } from "express";
import * as Actor from "../controllers/Actor";
import { validateName, sanitizeName, validationResponse } from "../validators";
import errorHandler from "../errors";

const router = Router();

router.post(
  "/",
  validateName("first-name"),
  validateName("last-name"),
  sanitizeName("first-name"),
  sanitizeName("last-name"),
  validationResponse,
  Actor.create,
  errorHandler
);

router.get("/:id([0-9]+)", Actor.readOne, errorHandler);

router.get("/", Actor.readAll, errorHandler);

router.put(
  "/:id([0-9]+)",
  validateName("first-name"),
  validateName("last-name"),
  sanitizeName("first-name"),
  sanitizeName("last-name"),
  validationResponse,
  Actor.update,
  errorHandler
);

router.delete("/:id([0-9]+)", validationResponse, Actor.remove, errorHandler);

export default router;
