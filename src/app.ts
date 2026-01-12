import express from "express";
import userRoute from "./routes/user.route";
import projectRoute from "./routes/project.route";
import { globalError } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/auth.middleware";
import { setupSwagger } from "./swagger";
const app = express();
setupSwagger(app);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);

app.use(globalError);

export default app;
