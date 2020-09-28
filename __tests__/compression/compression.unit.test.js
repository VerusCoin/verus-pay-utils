const { compress, decompress } = require('../../src/utils/compress')
const { COMPRESS_TEST_STRING } = require('../utils/constants')

describe('Lossless compression testing', () => {
  it('Can losslessly compress and decompress string', () => {    
    expect(compress(COMPRESS_TEST_STRING) === COMPRESS_TEST_STRING).toEqual(false)
    expect(compress(COMPRESS_TEST_STRING).length < COMPRESS_TEST_STRING.length).toEqual(true)
    expect(decompress(compress(COMPRESS_TEST_STRING))).toEqual(COMPRESS_TEST_STRING)
  })
})
