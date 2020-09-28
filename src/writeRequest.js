const VerusZkedidUtils = require('verus-zkedid-utils')
const BigNumber = require('bignumber.js');
const { compress } = require('./utils/compress')

module.exports = {
  /**
   * Creates a VerusPay Payment Request
   * @param {String} currency_id The ID of the currency in Verus format (e.g. .eth.)
   * @param {String} amount The amount to request
   * @param {CoinObj} coinObj The optional  coin object instance that the receiver must import to fulfill the request
   * @param {String} note An optional note to show the receiver
   * @param {Boolean} compressResult Whether or not to compress the output (lossless), for use in mediums like QR codes. This 
   * will most likely add non-ASCII characters
   */
  writeRequest: function (currency_id, amount, coinObj = null, note = "", compressResult = false) {
    const amountSplit = amount.split('.')
    const decimals = amountSplit.length > 1 ? amountSplit[1].length : 0;

    const amountBn = new BigNumber(amount).multipliedBy(
      new BigNumber(10).exponentiatedBy(new BigNumber(decimals))
    );

    const result = VerusZkedidUtils.VerusLink.writeLink([
      VerusZkedidUtils.PresetObjects.VerusPaymentRequest.create(
        currency_id,
        amountBn.toString(),
        decimals,
        coinObj != null ? VerusZkedidUtils.StructuredCurrencyImport.writeImport([
          coinObj,
        ]) : null,
        note
      )
    ])

    return compressResult ? compress(result) : result
  }
}