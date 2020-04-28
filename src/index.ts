import express, { Request, Response } from "express";
import cors from "cors";
import slashes from "connect-slashes";

import routes from "./routes";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(slashes(false));
app.use("/api/v1", router);

router.use("/genres", routes.genres);
router.use("/movies", routes.movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
