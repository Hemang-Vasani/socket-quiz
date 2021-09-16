// DEFINE ROUTER
const express = require("express");
const gRoute = express.Router();

// IMPORT CONTROLLERS
const gController = require("../controllers/game.c");

// IMPORT MIDDLEWARES

// Admin routes
gRoute.get("/", gController.start);
gRoute.get("/2", gController.start2);
gRoute.post("/signup", gController.signup);
gRoute.get("/home", gController.home);
gRoute.get("/leaderBoard", gController.leaderBoard);
gRoute.post('/rank', gController.rank);

// Client routes
// qRoute.post("/", qController);
// qRoute.get("/", qController);

// EXPORT ROUTES
module.exports = gRoute;
