const axios = require("axios");

module.exports = {
  getData: (base_url, partial_url, lang) =>
    axios({
      method: "GET",
      url: base_url + partial_url + lang,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }),
  getDetails: (base_url, id, lang) =>
    axios({
      method: "GET",
      url: base_url + "/api/" + id + lang,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }),
  getSearch: (base_url, searchText, lang, category, limit, offset) =>
    axios({
      method: "GET",
      url: base_url + "/api/search",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      params: {
        search: searchText,
        lang: lang,
        cat: category,
        lim: limit,
        off: offset,
      },
    }),
};
