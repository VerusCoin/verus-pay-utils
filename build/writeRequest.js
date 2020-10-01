const VerusZkedidUtils = require('verus-zkedid-utils');

const {
  compress
} = require('./utils/compress');

module.exports = {
  /**
   * Creates a VerusPay Payment Request
   * @param {String} currency_id The ID of the currency in Verus format (e.g. .eth.)
   * @param {String} amount The amount to request
   * @param {CoinObj} coinObj The optional  coin object instance that the receiver must import to fulfill the request
   * @param {{signer: String, signature: String}} signatureObj The data required to verify the coin import
   * @param {String} note An optional note to show the receiver
   * @param {Boolean} compressResult Whether or not to compress the output (lossless), for use in mediums like QR codes. This
   * will most likely add non-ASCII characters
   */
  writeRequest: function (currency_id, system_id, display_name, display_ticker, destination, amount, coinObj = null, signatureObj, note = "", compressResult = false) {
    let overrides = {
      currency_id,
      system_id,
      display_name,
      display_ticker
    };

    if (coinObj != null) {
      Object.keys(coinObj.data['structured_coin_object:vrsc'].data).map(key => {
        if (overrides[key] != null) {
          overrides[key] = '';
        }
      });
    }

    const result = VerusZkedidUtils.VerusLink.writeLink([VerusZkedidUtils.PresetObjects.VerusPaymentRequest.create(overrides.currency_id, overrides.system_id, overrides.display_name, overrides.display_ticker, destination, amount, coinObj != null ? VerusZkedidUtils.StructuredCurrencyImport.writeImport([coinObj]) : null, signatureObj, note)]);
    return compressResult ? compress(result) : result;
  }
};