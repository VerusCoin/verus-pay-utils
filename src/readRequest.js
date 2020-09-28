const { default: BigNumber } = require('bignumber.js')
const VerusZkedidUtils = require('verus-zkedid-utils')
const { VERUS_LINK, INVALID_SM_PARAMS, VERUS_PAYMENT_REQUEST } = VerusZkedidUtils.constants
const { decompress } = require('./utils/compress')

module.exports = {
  /**
   * Reads a payment request string and attempts to parse it
   * @param {String} requestLink The request string, in VerusLink format
   * @param {Boolean} isCompressed Whether or not the request link is compressed
   */
  readRequest: function(requestLink, isCompressed = false) {
    const link = VerusZkedidUtils.VerusLink.readLink(isCompressed ? decompress(requestLink) : requestLink)

    if (link.id !== VERUS_LINK || link.objects.length < 1)
      throw new VerusZkedidUtils.StructuredMemoError(
        "Invalid Parameters",
        "Invalid link.",
        INVALID_SM_PARAMS
      );
    
    const request = link.objects[0]

    if (request.type !== VERUS_PAYMENT_REQUEST)
      throw new VerusZkedidUtils.StructuredMemoError(
        "Invalid Parameters",
        "Invalid request.",
        INVALID_SM_PARAMS
      );
    
    const { currency_id, amount, decimals, currency_import, note } = request.payload
    const amountBn = new BigNumber(amount).dividedBy(new BigNumber(10).exponentiatedBy(new BigNumber(decimals)))

    let currencyImport = null

    if (currency_import.length > 0) {
      try {
        currencyImport = VerusZkedidUtils.StructuredCurrencyImport.readImport(currency_import)
      } catch(e) {
        console.warn("Could not decode currency import, ignoring.")
      }
    }
    
    return {
      version: request.version,
      currency_id,
      amount: amountBn.toString(),
      currency_import: currencyImport,
      note
    }
  } 
}