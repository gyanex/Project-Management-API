import app from "./app";
import connectDb from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on " + PORT);
    });
  })
  .catch(() => {
    console.log("something went wrong");
  });
