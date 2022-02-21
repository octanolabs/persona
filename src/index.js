import { bufferToHex, keccakFromHexString, stripHexPrefix, BN } from 'ethereumjs-util'
import names from './names'
import zodiacs from './zodiacs'

export function getPersona(address) {
  // hash the address, this will ensure minor differences in a given address
  // address will create major differences in the result.
  const keccak = bufferToHex(keccakFromHexString(address.toLowerCase()))
  // strip '0x' prefix from keccack hash
  const stripped = stripHexPrefix(keccak.toLowerCase())
  // split hash into byte array
  const split = stripped.match(/.{1,2}/g)

  // containers
  let sex = 0
  let sum = new BN(0) // sum of all positions
  let even = new BN(0) // sum of even positions
  let odd = new BN(0) // sum of odd positions

  /* eslint-disable no-unused-vars */
  for (const [index, hex] of split.entries()) {
    const value = new BN(hex, 16)
    sum = sum.plus(value)
    if (index % 2) {
      even = even.plus(value)
    } else {
      odd = odd.plus(value)
    }
  }

  // determine sex based on even/odd state off total sum
  if (sum % 2) {
    sex = 1
  }

  // determine zodiac
  const zodiacIndex = sum % 12
  const zodiac = zodiacs[zodiacIndex]

  // determine given name based on sex
  // total male given names: 512
  // total female given names: 512
  // maximum potential even sum: 4096
  let given = ''
  if (sex === 0) {
    given = names.female[Math.floor(even / 8)]
  } else {
    given = names.male[Math.floor(even / 8)]
  }

  // dertermine family name from a total of 4096
  // maximum potential odd sum: 4096
  const family = names.family[odd]

  // done
  return {
    sex: sex === 0 ? 'female' : 'male',
    name: {
      given,
      family,
    },
    zodiac,
  }
}