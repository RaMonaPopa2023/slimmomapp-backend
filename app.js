const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");
const productsRouter = require("./routes/api/products");
const caloriesRouter = require("./routes/api/calories");
const authRouter = require("./routes/api/auth.js");
const usersRouter = require("./routes/api/users.js");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/calories", caloriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
