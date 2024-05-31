import express, {
  NextFunction,
  Application,
  json,
  Request,
  Response,
} from "express";
import "colors";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import apiRouter from "./routes";

config();
2;
const app: Application = express();

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use("/api", apiRouter);

const PORT: string | number = process.env.PORT || 5000;
const ENV: string = process.env.NODE_ENV || "development";

app.get("/", (_req: Request, res: Response) => {
  return res.send("API Running...");
});

app.listen(PORT, () =>
  console.log(
    ` 📡 Backend server: `.inverse.yellow.bold +
      ` Running in ${ENV} mode on port ${PORT}`
  )
);
