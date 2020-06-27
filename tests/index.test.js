const loadCSV = require("../utilities/load-csv");
const DataAnalysis = require("../utilities/data-analysis");

describe('all C4C challenge tests', () => {
    test("loads data from CSV file", () => {
        let { data } = loadCSV("./data/C4C-dev-challenge-2018.csv", {
            dataColumns: [
                "violation_category",
                "violation_date",
                "violation_date_closed",
                "violation_type",
            ],
            shuffle: false,
        });

        expect(data).not.toBeNull()
        expect(data.length).toBe(545)
    });

    test("calculates violations per category", () => {
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

        expect(violationPerCategory).toBeTruthy()
        expect(violationPerCategory['Air Pollutants and Odors']).toBe(2)
        expect(violationPerCategory['Animals and Pests']).toBe(180)
        expect(violationPerCategory['Biohazards']).toBe(7)
        expect(violationPerCategory['Chemical Hazards']).toBe(17)
    });

    test("calculates earliest adnd latest violation per category", () => {
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

        const timeRangePerCategory = analysis.earliestLatestViolationPerCategory(data);

        expect(timeRangePerCategory).toBeTruthy()
        expect(timeRangePerCategory['Air Pollutants and Odors'].length).toBe(2)
        expect(Date.parse(timeRangePerCategory['Air Pollutants and Odors'][1])).toBeGreaterThan(Date.parse(timeRangePerCategory['Air Pollutants and Odors'][0]))
        expect(Date.parse(timeRangePerCategory['Biohazards'][1])).toBeGreaterThan(Date.parse(timeRangePerCategory['Biohazards'][0]))
        expect(Date.parse(timeRangePerCategory['Unsanitary Conditions'][1])).toBeGreaterThan(Date.parse(timeRangePerCategory['Unsanitary Conditions'][0]))
    });

    test("shuffling data does not change the outcome", () => {
        let { data } = loadCSV("./data/C4C-dev-challenge-2018.csv", {
            dataColumns: [
                "violation_category",
                "violation_date",
                "violation_date_closed",
                "violation_type",
            ],
            shuffle: false,
        });

        const analysis1 = new DataAnalysis(data);
        analysis1.getUniqueCategories();
        const violationPerCategory1 = analysis1.numberOfViolationsPerCategory(data);
        const timeRangePerCategory1 = analysis1.earliestLatestViolationPerCategory(data);

        data = loadCSV("./data/C4C-dev-challenge-2018.csv", {
            dataColumns: [
                "violation_category",
                "violation_date",
                "violation_date_closed",
                "violation_type",
            ],
            shuffle: true,
        }).data;
        const analysis2 = new DataAnalysis(data);
        analysis2.getUniqueCategories();
        const violationPerCategory2 = analysis2.numberOfViolationsPerCategory(data);
        const timeRangePerCategory2 = analysis2.earliestLatestViolationPerCategory(data);

        expect(violationPerCategory1).toEqual(violationPerCategory2)
        expect(timeRangePerCategory1).toEqual(timeRangePerCategory2)
    });
});
