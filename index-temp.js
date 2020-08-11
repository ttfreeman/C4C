const loadCSV = require("./utilities/load-csv");
const DataAnalysis = require("./utilities/data-analysis");
const API = require("./utilities/get-api");

const base_url = "http://healthycanadians.gc.ca/recall-alert-rappel-avis";
const partial_url = "/api/recent/";
const lang = "en";

const apiCall = async () => {
  const recent = await API.getRecent(base_url, partial_url, lang);
  console.log("Recent results= ", recent.data.results);

  // const id = recent.data.results.ALL[3].recallId;
  // const details = await API.getDetails(base_url, id, lang);
  // console.log("Details results= ", details.data);

  // const searchText = "vegetable";
  // const searchResults = await API.getSearch(
  //   base_url,
  //   searchText,
  //   lang
  //   // category,
  //   // limit,
  //   // offset
  // );
  // console.log("Search results= ", searchResults.data);
};

apiCall();

// let { data } = loadCSV("./data/C4C-dev-challenge-2018.csv", {
//   dataColumns: [
//     "violation_category",
//     "violation_date",
//     "violation_date_closed",
//     "violation_type",
//   ],
//   shuffle: false,
// });

// const analysis = new DataAnalysis(data);

// analysis.getUniqueCategories();

// const violationPerCategory = analysis.numberOfViolationsPerCategory(data);

// const timeRangePerCategory = analysis.earliestLatestViolationPerCategory(data);

// console.log(
//   "\n*** Printing total violations in each category ***\n",
//   violationPerCategory
// );
// console.log(
//   "\n*** Printing time range of violations in each category ***\n",
//   timeRangePerCategory
// );
