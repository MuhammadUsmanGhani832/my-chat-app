const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");

dotenv.config();
const PORT = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/my-chat-app", routes);

app.listen(PORT, () => {
  console.log("listen on " + PORT);
});
