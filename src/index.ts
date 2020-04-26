import express, { Request, Response } from "express";

import cors from "cors";
import slashes from "connect-slashes";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(slashes());
app.use("/api/v1", router);

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Tjosan!</h1>");
});

app.listen(3000, () => console.log("Listening on port 3000"));
