const loadCSV = require("./utilities/load-csv");
const DataAnalysis = require("./utilities/data-analysis");

let { data } = loadCSV("./data/C4C-dev-challenge-2018.csv", {
  dataColumns: [
    "violation_category",
    "violation_date",
    "violation_date_closed",
    "violation_type",
  ],
  shuffle: false,
});

const analysis = new DataAnalysis(data);

analysis.getUniqueCategories();

const violationPerCategory = analysis.numberOfViolationsPerCategory(data);

const timeRangePerCategory = analysis.earliestLatestViolationPerCategory(data);

console.log(
  "\n*** Printing total violations in each category ***\n",
  violationPerCategory
);
console.log(
  "\n*** Printing time range of violations in each category ***\n",
  timeRangePerCategory
);
