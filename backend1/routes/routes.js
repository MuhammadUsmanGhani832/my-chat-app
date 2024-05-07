const express = require("express");
const authController = require("../controllers/authController");

const routes = express.Router();

//auth routes
routes.post("/signup", authController.signup);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);

// get all
routes.get('get-user',authController.getAll)

module.exports = routes;
