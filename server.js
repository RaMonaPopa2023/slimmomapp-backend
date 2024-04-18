const { default: mongoose } = require("mongoose");
const app = require("./app");

require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("Database connection successful");
    app.listen(8080, () => {
      console.log("Server is running. Use our API on port: 8080");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectToDb();
