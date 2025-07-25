const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/upme.controller");

const app = express.Router();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-auth-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get(
  "/api/:version/upme",
  controller.syncAllData
);

app.get(
  "/api/:version/upme/data",
  controller.getAllData
);

module.exports = app;
