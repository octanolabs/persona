import { bufferToHex, keccakFromHexString, keccakFromString, stripHexPrefix, isHexPrefixed, BN } from 'ethereumjs-util'
import names from './names'
import zodiacs from './zodiacs'

const ADDRESS = new RegExp(/^0x[0-9a-fA-F]{40}$/i)
const TOKENID = new RegExp(/[0-9]/i)
const CHAINID = new RegExp(/[0-9]/i)

function getDNA(str) {
  let keccak = null
  // hash the string, this will ensure minor differences in a given address/data
  // will create major differences in the end result.
  if (isHexPrefixed(str)) {
    // is a plain address 
    keccak = bufferToHex(keccakFromHexString(str.toLowerCase()))
  } else {
    // is a seed strong, e.g from getPersonaNFT
    keccak = bufferToHex(keccakFromString(str.toLowerCase()))
  }
  // strip '0x' prefix from keccack hash
  const stripped = stripHexPrefix(keccak.toLowerCase())
  // split hash into byte array
  const split = stripped.match(/.{1,2}/g)
  return split.entries()
}

function dnaToPersona(dna, sex) {
  // containers
  let sum = new BN(0) // sum of all positions
  let even = new BN(0) // sum of even positions
  let odd = new BN(0) // sum of odd positions

  /* eslint-disable no-unused-vars */
  for (const [index, hex] of dna) {
    const value = new BN(hex, 16)
    sum = sum.add(value)
    if (index % 2) {
      even = even.add(value)
    } else {
      odd = odd.add(value)
    }
  }

  if (!sex) {
    // determine sex based on even/odd state off total sum
    if (sum % 2) {
      sex = 1 // male
    } else {
      sex = 0
    }
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
    sex: sex === 0 ? 'female' : 'male',
    name: {
      given,
      family,
    },
    zodiac,
  }
}

export function getPersona(address) {
  // validate address
  if (!ADDRESS.test(address)) {
    return {
      success: false,
      error: address + " is not a valid address"
    }
  }
  
  // generate dna from address
  const dna = getDNA(address)
  // produce persona from dna
  const persona = dnaToPersona(dna)
  
  // add extra values
  persona.success = true
  persona.version = 1

  // done
  return persona
}

export function getPersonaNFT(contractAddress, tokenId, chainId, sex) {
  // validate address
  if (!ADDRESS.test(contractAddress)) {
    return {
      success: false,
      error: address + " is not a valid contract address (/^0x[0-9a-fA-F]{40}$/i)"
    }
  }
  // validate tokenId
  if (!TOKENID.test(tokenId)) {
    return {
      success: false,
      error: tokenId + " is not a valid tokenId (/[0-9]/i)"
    }
  }
  // validate optional args if present
  if (!CHAINID.test(chainId)) {
    return {
      success: false,
      error: chainId + " is not a valid chainId (/[0-9]/i)"
    }
  }
  // validation optional sex override arg (if present)
  if (sex) {
    if (sex != 'male' && sex != 'female') {
      return {
        success: false,
        error: sex + " is not a valid sex ('male' or 'female')"
      }
    }
  }

  const seed = `${chainId}-${contractAddress}-${tokenId}`
  // generate dna from address
  const dna = getDNA(seed)
  // produce persona from dna
  const persona = dnaToPersona(dna, sex)

  // add extra values
  persona.success = true
  persona.version = 1

  return persona
}