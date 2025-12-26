import express from "express";
const app = express();
app.use(express.json())
import userRoute from "./routes/user.route";


app.use("/api/v1/user", userRoute);

export default app;
