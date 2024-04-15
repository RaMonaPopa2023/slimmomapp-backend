// const mongoose = require("mongoose");
// const app = require("./app.js");

// const { DB_HOST, PORT = 8080 } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT);
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });

const { default: mongoose } = require("mongoose");

require("dotenv").config();

// Database connect
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    app.listen(8080, () => {
      console.log("Server is running. Use our API on port: 8080");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connectToDb };
