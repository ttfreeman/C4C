const express = require("express");
const router = new express.Router();

const API = require("../utilities/get-api");

const base_url = "http://healthycanadians.gc.ca/recall-alert-rappel-avis";
const lang = "en";

router.get("/api/recent", async (req, res) => {
  const partial_url = "/api/recent/";
  try {
    const recent = await API.getRecent(base_url, partial_url, lang);
    res.status(200).send({ data: recent.data.results });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/api/details/:id", async (req, res) => {
  const id = req.params.id;
  const details = await API.getDetails(base_url, id, lang);
  res.status(200).send({ data: details.data });
});

router.get("/api/search", async (req, res) => {
  const searchText = req.query.search;
  if (!searchText) {
    res.status(422).send({ message: "search text must be provided" });
  }
  const limit = 10;
  const category = req.query.cat || 0;
  const offset = req.query.off || 0;

  console.log("req.query", req.query);
  const searchResults = await API.getSearch(
    base_url,
    searchText,
    lang,
    category,
    limit,
    offset
  );
  res.status(200).send({ data: searchResults.data.results });
});

module.exports = router;
