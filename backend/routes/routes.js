const express = require("express");
const User = require("../model/auth.model");
const authController = require("../controllers/authController");
const messagesController = require("../controllers/messagesController");
const protectedRoutes = require("../middlewares/portectedRoutes");

const routes = express.Router();

// auth routes

routes.post("/signup", authController.signup);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);

// user for side bar

routes.get("/users", protectedRoutes, authController.getAll);

// message routes

routes.post(
  "/messages/send/:id",
  protectedRoutes,
  messagesController.sendMessage
);
routes.get("/messages/:id", protectedRoutes, messagesController.getMessages);

module.exports = routes;
