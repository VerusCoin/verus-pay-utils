const {
  default: BigNumber
} = require('bignumber.js');

const VerusZkedidUtils = require('verus-zkedid-utils');

const {
  VERUS_LINK,
  INVALID_SM_PARAMS,
  VERUS_PAYMENT_REQUEST
} = VerusZkedidUtils.constants;

const {
  decompress
} = require('./utils/compress');

module.exports = {
  /**
   * Reads a payment request string and attempts to parse it
   * @param {String} requestLink The request string, in VerusLink format
   * @param {Boolean} isCompressed Whether or not the request link is compressed
   */
  readRequest: function (requestLink, isCompressed = false) {
    const link = VerusZkedidUtils.VerusLink.readLink(isCompressed ? decompress(requestLink) : requestLink);
    if (link.id !== VERUS_LINK || link.objects.length < 1) throw new VerusZkedidUtils.StructuredMemoError("Invalid Parameters", "Invalid link.", INVALID_SM_PARAMS);
    const request = link.objects[0];
    if (request.type !== VERUS_PAYMENT_REQUEST) throw new VerusZkedidUtils.StructuredMemoError("Invalid Parameters", "Invalid request.", INVALID_SM_PARAMS);
    let {
      currency_id,
      system_id,
      display_name,
      display_ticker,
      currency_import_signature,
      currency_import_signer,
      amount,
      currency_import,
      note
    } = request.payload;
    let overloads = {
      currency_id,
      system_id,
      display_name,
      display_ticker
    };
    let currencyImport = null;

    if (currency_import.length > 0) {
      try {
        currencyImport = VerusZkedidUtils.StructuredCurrencyImport.readImport(currency_import);

        if (currencyImport.objects[0] != null) {
          Object.keys(overloads).forEach(key => {
            if (currencyImport.objects[0][key] && currencyImport.objects[0][key].length > 0) {
              overloads[key] = currencyImport.objects[0][key];
            }
          });
        }
      } catch (e) {
        console.warn("Could not decode currency import, ignoring.");
      }
    }

    return {
      version: request.version,
      ...overloads,
      currency_import_signature,
      currency_import_signer,
      amount,
      currency_import: currencyImport,
      note
    };
  }
};