const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/");
require("dotenv").config();
const db = require("./utils/db");

const PORT = process.env.PORT || 8000;

//temporary code to add user to req
if (process.env.ENVIRONMENT === "development") {
  const data = require("./test_data");
  app.use((req, res, next) => {
    req.user = data.users().user1;
    next();
  });
}

app.use("/", router);

mongoose
  .connect(process.env.DB_PATH, { useNewUrlParser: true })
  .then(() => {
    if (process.env.ENVIRONMENT === "development") {
      db.initialData();
    }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Connection to DB Error: ", error));
