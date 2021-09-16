// DEFINE ROUTER
const express = require("express");
const app = express();

// IMPORT ROUTES
const uRoutes = require("./user.r");
const qRoutes = require("./question.r");
const gRoutes = require("./game.r");

// ALL ROUTES
app.use("/u", uRoutes);
app.use("/q", qRoutes);
app.use("/g", gRoutes);

// EXPORT ROUTES
module.exports = app;