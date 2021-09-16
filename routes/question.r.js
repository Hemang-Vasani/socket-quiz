// DEFINE ROUTER
const express = require("express");
const qRoute = express.Router();

// IMPORT CONTROLLERS
const qController = require("../controllers/question.c");
const upload = require("../services/file-upload-question")

// IMPORT MIDDLEWARES

// Admin routes
qRoute.post("/addQ",upload.single('image'), qController.addQuestion);
qRoute.get("/getQ", qController.getQuestion);
qRoute.get("/getAll", qController.getQuestion);
qRoute.post('/deleteQ', qController.deleteQuestion);
qRoute.post('/deleteAll', qController.deleteAll);
qRoute.get('/showQues', qController.showQuestion);

// Client routes
// qRoute.post("/", qController);
// qRoute.get("/", qController);

// EXPORT ROUTES
module.exports = qRoute;
