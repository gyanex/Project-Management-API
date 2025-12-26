import express from "express";
const app = express();
app.use(express.json())
import userRoute from "./routes/user.route";
import { globalError } from "./middlewares/error.middleware";


app.use("/api/v1/user", userRoute);

app.use(globalError)

export default app;
