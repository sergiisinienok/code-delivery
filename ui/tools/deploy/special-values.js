const { get } = require('lodash');

module.exports = {
  getCapitalizedStage: sls => get(sls, 'processedInput.options.stage', '').toUpperCase(),
}
