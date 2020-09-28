const VerusZkedidUtils = require('verus-zkedid-utils');

const {
  readRequest
} = require('./readRequest');

const {
  writeRequest
} = require('./writeRequest');

module.exports = {
  getCoinObj: VerusZkedidUtils.PresetObjects.CoinObj.create,
  readRequest,
  writeRequest
};