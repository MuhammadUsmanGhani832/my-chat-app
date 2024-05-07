const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
dotenv.config();
const app = express();
app.use(express.json());
app.use("/my-chat-app", routes);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// mongo db connection

mongoose.connect(MONGO_URL);
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("error in db connection", err.message);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

app.listen(PORT, () => {
  console.log("hite");
  console.log("listening on ", PORT);
});
