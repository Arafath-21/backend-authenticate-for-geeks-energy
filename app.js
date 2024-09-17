const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const path = require("path");
const cors = require("cors");
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:8500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await connectDB(process.env.MONGO_URI);
    console.log(`The DB is Connected`);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
