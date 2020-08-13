const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("index.html");
});

router.get("/recent", (req, res) => {
  res.render("recent.html");
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  res.render("details.html", { id });
});

router.get("/search", (req, res) => {
  res.render("search.html");
});

module.exports = router;
