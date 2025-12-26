import app from "./app";
import connectDb from "./config/db";

connectDb()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server listening on 4000");
    });
  }).catch(() => {
    console.log("something went wrong");
  })
