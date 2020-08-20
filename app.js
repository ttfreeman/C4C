const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const recallsRouter = require("./routers/appRouter");
const apiRouter = require("./routers/apiRouter");

const publicDirPath = path.join(__dirname, "./public");

app.set("view engine", "html");
app.engine("html", require("hbs").__express);

app.use(express.json());
app.use(express.static(publicDirPath));
app.use(recallsRouter);
app.use(apiRouter);

module.exports = app;
