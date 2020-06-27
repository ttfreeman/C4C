class DataAnalysis {
  constructor(data) {
    this.data = data;
    this.uniqueCategories = [];
  }

  numberOfViolationsPerCategory(data) {
    let violationPerCategory = this.uniqueCategories.reduce(
      (a, b) => ((a[b] = 0), a),
      {}
    );

    this.data.forEach((element) => {
      if (this.uniqueCategories.indexOf(element[0]) > -1) {
        violationPerCategory[element[0]] += 1;
      }
    });

    return violationPerCategory;
  }

  earliestLatestViolationPerCategory() {
    let timeRangePerCategory = this.uniqueCategories.reduce(
      (a, b) => ((a[b] = []), a),
      {}
    );

    this.data.forEach((element) => {
      if (this.uniqueCategories.indexOf(element[0]) > -1) {
        timeRangePerCategory[element[0]].push(element[1]);
      }
    });
    Object.keys(timeRangePerCategory).map((key) => {
      timeRangePerCategory[key] = [
        new Date(Math.min(...timeRangePerCategory[key])),
        new Date(Math.max(...timeRangePerCategory[key])),
      ];
    });

    return timeRangePerCategory;
  }

  getUniqueCategories() {
    const categories = this.data.map((element) => element[0]);
    this.uniqueCategories = [...new Set(categories)].sort();
  }
}

module.exports = DataAnalysis;
