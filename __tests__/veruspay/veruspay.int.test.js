const { readRequest, writeRequest, getCoinObj } = require('../../src/index');
const {
  getRequestParams,
  TEST_IMPORT_COIN_OBJ
} = require("../utils/constants");

describe('VerusPay payment request read/write testing.', () => {
  const coinObj = getCoinObj(TEST_IMPORT_COIN_OBJ)

  it('Can create and read VerusPay request properly (no coin import, no compression, no note)', () => {   
    const params = getRequestParams()
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (no coin import, no compression, note)', () => {   
    const params = getRequestParams(null, false, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (no coin import, compression, no note)', () => { 
    const params = getRequestParams(null, true, null)
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (no coin import, compression, note)', () => { 
    const params = getRequestParams(null, true, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, no compression, no note)', () => {  
    const params = getRequestParams(coinObj, false, null)
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, no compression, note)', () => {  
    const params = getRequestParams(coinObj, false, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, compression, no note)', () => {  
    const params = getRequestParams(coinObj, true, null)
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, compression, note)', () => {  
    const params = getRequestParams(coinObj, true, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      signatureObj: {
        signer: requestObj.currency_import_signer,
        signature: requestObj.currency_import_signature,
      },
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json);
  })

  it('Can create and read VerusPay request with missing parameters', () => {  
    const params = {
      params: [
      null,
      "i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV",
      "Verus Coin",
      "VRSC",
      "RJqTq1SZ85WkTs9yBu18kmGxXkVU3AwcEA",
      "2",
      null,
      null,
      null,
      true,
    ],
    json: {
      system_id: 'i5w5MuNik5NtLcYmNzcvaoixooEebB6MGV',
      currency_id: '',
      display_name: "Verus Coin",
      display_ticker: "VRSC",
      destination: "RJqTq1SZ85WkTs9yBu18kmGxXkVU3AwcEA",
      amount: "2",
      note: ''
    }}
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)
    
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      destination: requestObj.destination,
      amount: requestObj.amount,
      system_id: requestObj.system_id,
      display_name: requestObj.display_name,
      display_ticker: requestObj.display_ticker,
    }).toEqual(params.json);
  })
})
