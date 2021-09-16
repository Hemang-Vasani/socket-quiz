// DEFINE ROUTER
const express = require("express");
const uRoute = express.Router();

// IMPORT CONTROLLERS
const uController = require("../controllers/user.c");

// IMPORT MIDDLEWARES

// Admin routes
// uRoute.post("/", uController);
uRoute.get("/getAll", uController.getAll);
uRoute.post("/deleteU", uController.deleteUser);
uRoute.post("/deleteAll", uController.deleteAll);
uRoute.post("/addUser", uController.addUser);

// Client routes
// uRoute.post("/", uController);
// uRoute.get("/", uController);

// EXPORT ROUTES
module.exports = uRoute;
