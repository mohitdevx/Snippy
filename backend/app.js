import express from "express";
import cors from "cors";
import { userRouter } from "./src/routes/user.route.js";
import { globalErrorHandler } from "./src/utils/globalError.js";
import cookieParser from "cookie-parser";

export const app = express();

const appMiddware = [
  cors({
	  origin: 'http://localhost:5173',
    	  credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser()
];

app.use(appMiddware);
app.use("/api", userRouter);
app.use(globalErrorHandler);
