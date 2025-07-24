import connectDB from "./db/database.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server Is Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Data Base Connection failed", error.message);
  });
