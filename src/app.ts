import express, { Request, Response } from "express";
import cors from "cors";
import slashes from "connect-slashes";
import config from "./lib/config";

import routes from "./routes";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(slashes(false));

app.use("/api/v1", router);

router.use("/", routes.root);
router.use("/movies", routes.movies);
router.use("/genres", routes.genres);
router.use("/actors", routes.actors);

export default app;
