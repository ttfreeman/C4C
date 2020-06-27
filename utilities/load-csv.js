const fs = require('fs');
const _ = require('lodash');
const shuffleSeed = require('shuffle-seed');

function extractColumns(data, columnNames) {
  const headers = _.first(data);
  const indexes = _.map(columnNames, column => headers.indexOf(column));

  const extracted = _.map(data, row => _.pullAt(row, indexes));

  return extracted;
}

module.exports = function loadCSV(
  filename,
  {
    dataColumns = [],
    shuffle = false,
  }
) {
  let data = fs.readFileSync(filename, { encoding: 'utf-8' });
  data = _.map(data.split('\r\n'), d => d.split(','));
  data = _.dropRightWhile(data, val => _.isEqual(val, ['']));
  const headers = _.first(data);

  data = _.map(data, (row, index) => {
    if (index === 0) {
      return row;
    }
    return _.map(row, (element, index) => {
      const result = Date.parse(element.replace("/\r", ""));
      if (_.isNaN(result) || isNaN(result)) {
        return element
      }
      return result
    });
  });

  data = extractColumns(data, dataColumns);

  data.shift();

  if (shuffle) {
    data = shuffleSeed.shuffle(data, 'phrase');
  }

  return { data };

};
