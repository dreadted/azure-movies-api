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
  res.send("<h1>Hoppsan!</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
