import { Router } from "express";
import * as Genre from "../controllers/Genre";
import errorHandler from "../errors";

const router = Router();

router.get("/hello", Genre.hello, errorHandler);

router.post("/", Genre.create, errorHandler);

router.get("/:id([0-9]+)", Genre.readOne, errorHandler);
router.get("/", Genre.readAll, errorHandler);

router.put("/:id([0-9]+)", Genre.update, errorHandler);

router.delete("/:id([0-9]+)", Genre.remove, errorHandler);

export default router;
