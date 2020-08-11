const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("index.html");
});

router.get("/recent", (req, res) => {
  res.render("recent.html");
});

router.get("/details", (req, res) => {
  res.render("details.html");
});

router.get("/search", (req, res) => {
  res.render("search.html");
});

module.exports = router;
