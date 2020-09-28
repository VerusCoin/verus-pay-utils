const { readRequest, writeRequest, getCoinObj } = require('../../src/index');
const { compress } = require('../../src/utils/compress');
const {
  getRequestParams,
  NO_IMPORT_NO_COMPRESS_NO_NOTE_REQUEST,
  NO_IMPORT_NO_COMPRESS_NOTE_REQUEST,
  NO_IMPORT_COMPRESS_NOTE_REQUEST,
  NO_IMPORT_COMPRESS_NO_NOTE_REQUEST,
  IMPORT_NO_COMPRESS_NO_NOTE_REQUEST,
  IMPORT_NO_COMPRESS_NOTE_REQUEST,
  IMPORT_COMPRESS_NO_NOTE_REQUEST,
  IMPORT_COMPRESS_NOTE_REQUEST,
  TEST_IMPORT_COIN_OBJ
} = require("../utils/constants");

describe('VerusPay payment request read/write testing.', () => {
  const coinObj = getCoinObj(TEST_IMPORT_COIN_OBJ)

  it('Can create and read VerusPay request properly (no coin import, no compression, no note)', () => {   
    const params = getRequestParams()
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect(request).toEqual(NO_IMPORT_NO_COMPRESS_NO_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (no coin import, no compression, note)', () => {   
    const params = getRequestParams(null, false, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect(request).toEqual(NO_IMPORT_NO_COMPRESS_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (no coin import, compression, no note)', () => { 
    const params = getRequestParams(null, true, null)
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect(request).toEqual(NO_IMPORT_COMPRESS_NO_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (no coin import, compression, note)', () => { 
    const params = getRequestParams(null, true, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect(request).toEqual(NO_IMPORT_COMPRESS_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import,
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, no compression, no note)', () => {  
    const params = getRequestParams(coinObj, false, null)
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect(request).toEqual(IMPORT_NO_COMPRESS_NO_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, no compression, note)', () => {  
    const params = getRequestParams(coinObj, false, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request)

    expect(request).toEqual(IMPORT_NO_COMPRESS_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, compression, no note)', () => {  
    const params = getRequestParams(coinObj, true, null)
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect(request).toEqual(IMPORT_COMPRESS_NO_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })

  it('Can create and read VerusPay request properly (coin import, compression, note)', () => {  
    const params = getRequestParams(coinObj, true, "test")
    const request = writeRequest(...params.params)
    const requestObj = readRequest(request, true)

    expect(request).toEqual(IMPORT_COMPRESS_NOTE_REQUEST)
    expect({
      currency_id: requestObj.currency_id,
      note: requestObj.note,
      coinImport: requestObj.currency_import.objects[0],
      note: requestObj.note,
      amount: requestObj.amount
    }).toEqual(params.json)
  })
})
