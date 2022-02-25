import { bufferToHex, keccakFromHexString, stripHexPrefix, BN } from 'ethereumjs-util'
import names from './names'
import zodiacs from './zodiacs'

const ADDRESS = new RegExp(/^0x[0-9a-fA-F]{40}$/i)

export function getPersona(address) {
  // validate address
  if (!ADDRESS.test(address)) {
    return {
      success: false,
      error: address + " is not a valid address"
    }
  }
  // hash the address, this will ensure minor differences in a given address
  // will create major differences in the end result.
  const keccak = bufferToHex(keccakFromHexString(address.toLowerCase()))
  // strip '0x' prefix from keccack hash
  const stripped = stripHexPrefix(keccak.toLowerCase())
  // split hash into byte array
  const split = stripped.match(/.{1,2}/g)

  // containers
  let sex = 0 // female
  let sum = new BN(0) // sum of all positions
  let even = new BN(0) // sum of even positions
  let odd = new BN(0) // sum of odd positions
  let h1 = new BN(0) // sum of half 1 positions
  let h2 = new BN(0) // sum of half 2 positions

  const positions = split.entries()

  /* eslint-disable no-unused-vars */
  for (const [index, hex] of positions) {
    const value = new BN(hex, 16)
    sum = sum.add(value)
    if (index % 2) {
      even = even.add(value)
    } else {
      odd = odd.add(value)
    }
  }

  // determine sex based on even/odd state off total sum
  if (sum % 2) {
    sex = 1 // male
  }

  // determine zodiac
  const zodiacIndex = sum % 12
  const zodiac = zodiacs[zodiacIndex]

  // determine given name based on sex
  // total male given names: 512
  // total female given names: 512
  // maximum potential odd sum: 4096
  // maximum potential even sum: 4096
  let given = '' 
  if (sex === 0) {
    // female. use sum of even positions
    given = names.female[Math.floor(even / 8)]
  } else {
    // male. use sum of odd positions
    given = names.male[Math.floor(odd / 8)]
  }

  // determine family name from a total of 4096
  // maximum potential sum: 8192
  const family = names.family[Math.floor(sum/2)]

  // done
  return {
    success: true,
    sex: sex === 0 ? 'female' : 'male',
    name: {
      given,
      family,
    },
    zodiac,
    version: 1 // in case we make breaking changes in future.
  }
}