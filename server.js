const mongoose = require("mongoose");
const app = require("./app.js");

const { DB_HOST, PORT = 8080 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
