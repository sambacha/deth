import { expect } from 'chai'
import testCasesJSON from './testCases.json'
import { Bytes } from '../../src/Bytes'
import { RlpInput, rlpEncode, rlpDecode } from '../../src/rlp'

const testCases = testCasesJSON.map(test => ({
  name: test.name,
  decoded: mapDecoded(test.decoded),
  encoded: mapHex(test.encoded),
}))

type Decoded = string | Decoded[]

function mapDecoded (value: Decoded): RlpInput {
  if (Array.isArray(value)) {
    return value.map(mapDecoded)
  } else {
    return mapHex(value)
  }
}

function mapHex (value: string) {
  return Bytes.fromString(value.substring(2))
}

describe('rlpEncode', () => {
  for (const testCase of testCases) {
    it(testCase.name, () => {
      const result = rlpEncode(testCase.decoded)
      expect(result).to.deep.equal(testCase.encoded)
    })
  }
})

describe.skip('rlpDecode', () => {
  for (const testCase of testCases) {
    it(testCase.name, () => {
      const result = rlpDecode(testCase.encoded)
      expect(result).to.deep.equal(testCase.decoded)
    })
  }
})
