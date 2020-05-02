import { Router } from "express";
import * as Actor from "../controllers/Actor";
import * as Role from "../controllers/Role";
import { validateName, sanitizeName, validationResponse } from "../validators";
import { errorHandler, Methods, notAllowed } from "../errors";

const router = Router();

// POST
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

router.post(
  "/:actorId([0-9]+)/roles/:movieId([0-9]+)",
  validateName("name"),
  validationResponse,
  Role.create,
  errorHandler
);

// GET
router.get("/", Actor.readAll, errorHandler);
router.get("/:id([0-9]+)", Actor.readOne, errorHandler);
router.get("/:actorId([0-9]+)/roles", Role.readAll, errorHandler);
router.get(
  "/:actorId([0-9]+)/roles/:movieId([0-9]+)",
  Role.readAll,
  errorHandler
);

// PUT
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

// DELETE
router.delete("/:id([0-9]+)", validationResponse, Actor.remove, errorHandler);
router.delete(
  "/:actorId([0-9]+)/roles/:movieId([0-9]+)/:roleId([0-9]+)",
  Role.remove,
  errorHandler
);

// Methods not allowed
notAllowed(router, "/", [Methods.PUT, Methods.PATCH, Methods.DELETE]);
notAllowed(router, "/:id([0-9]+)", [Methods.PATCH]);
notAllowed(router, "/:actorId([0-9]+)/roles", [
  Methods.POST,
  Methods.PUT,
  Methods.PATCH,
  Methods.DELETE
]);
notAllowed(router, "/:actorId([0-9]+)/roles/:movieId([0-9]+)", [
  Methods.PUT,
  Methods.PATCH,
  Methods.DELETE
]);
notAllowed(router, "/:actorId([0-9]+)/roles/:movieId([0-9]+)/:roleId([0-9]+)", [
  Methods.GET,
  Methods.POST,
  Methods.PUT,
  Methods.PATCH
]);

export default router;
