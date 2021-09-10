import BigNumber from 'bignumber.js'
import { keccakFromHexString, bufferToHex } from 'ethereumjs-util'
import Childhood from './data/backstory/childhood.json'
import Adulthood from './data/backstory/adulthood.json'
import Skills from './data/skills.json'
import Traits from './data/traits.json'
import maleNames from './data/names/first/male.json'
import femaleNames from './data/names/first/female.json'
import familyNames from './data/names/family.json'
import sexes from './data/sexes.json'

/*

0x [3e] [A7] [ Cc 0F 43 4b 87 11 ] [ cf 6b CD 0d 49 eE DF 67 A8 23 3A f9 ]
0x [childhood] [adulthood] [traits] [skills]
0x [a8] [3a] [ ec 5c 40 6a f2 3f ] [ 3a e6 c2 b6 79 01 dd 2c 85 94 86 9f ] 0b 6b 68 ac 3b e5 78 c8 d3 [ 55 c1 71 ]
--- special rules ---
#1 bloodlust: requires persona to be capable of violent
#2 abrasive: requires persona be capable of Social
#3 too-smart: requires persona be capable of Intellectual.

#4 brawler: disallows shooting passions

#5 gourmand: +4 cooking
#6 pyromaniac: incapable of firefighting

*/

const skills = Skills 

export function getPersona(address) { 
  // split address
  const keccak = bufferToHex(keccakFromHexString(address))
  const stripped = stripHexPrefix(keccak.toLowerCase())
  const split = stripped.match(/.{1,2}/g)
  const childhoodHex = split[0] // childhood segment
  const adulthoodHex = split[1] // adulthood segment
  const name = {
    first: new BigNumber(split[29], 16).toNumber(),
    second: new BigNumber(split[30], 16).toNumber(),
    last: new BigNumber(split[31], 16).toNumber()
  }

  const traitsHex = split.slice(2, 8) // traits segment
  const levelsHex = split.slice(8, 20) // skills segment

  // consts
  let sex = 0
  const baseSkills = []
  const traits = {}

  // child hood backstory
  const childhoodDecimal = new BigNumber(childhoodHex.toLowerCase(), 16).toNumber()
  const n = Math.floor(childhoodDecimal / 4) // currently 64 options (256/64=4)
  const childhood = Childhood[n]

  // adult hood backstory
  const adulthoodDecimal = new BigNumber(adulthoodHex.toLowerCase(), 16).toNumber()
  const n2 = Math.floor(adulthoodDecimal / 4) // currently 64 options (256/64=4)
  const adulthood = Adulthood[n2]

  // determine sex
  let sum = new BigNumber(0)
  for (const [index, hex] of split.entries()) {
    sum = sum.plus(new BigNumber(hex, 16))
  }
  if ( sum % 2 ) {
    // odd
    sex = 1
  }

  // set up incapable actions
  const incapableOf = {...childhood.block, ...adulthood.block}

  let firstName = ""
  let secondName = ""
  if (sex === 0) {
    firstName = femaleNames[name.first]
    secondName = femaleNames[name.second]
  } else {
    firstName = maleNames[name.first]
    secondName = maleNames[name.second]
  }
  const familyName = familyNames[name.last/2]
  // determine traits
  for (const [index, hex] of traitsHex.entries()) {
    let roll = new BigNumber(hex, 16).toNumber()
    if (Traits.map[roll] !== null) {
      const traitId = Traits.map[roll]
      const trait = Traits.data[traitId]
      let conflicted = false
      if (trait) {
        if (trait.conflicts && trait.conflicts.length > 0) {
          for (const conflict of trait.conflicts) {
            if (traits[conflict]) {
              console.log('trait ' + traitId + ' conflicts with ' + conflict )
              conflicted = true
            }
          }
        }
        // special rules
        // #1
        if (traitId === 'bloodlust') {
          if (childhood.block && childhood.block.violent || adulthood.block && adulthood.block.violent) {
            console.log('trait ' + traitId + ' conflicts with special rule #1')
            conflicted = true
          }
        }
        // #2
        if (traitId === 'abrasive') {
          if (childhood.block && childhood.block.social || adulthood.block && adulthood.block.social) {
            console.log('trait ' + traitId + ' conflicts with special rule #2')
            conflicted = true
          }
        }
        // #3
        if (traitId === 'too-smart') {
          if (childhood.block && childhood.block.intellectual || adulthood.block && adulthood.block.intellectual) {
            console.log('trait ' + traitId + ' conflicts with special rule #3')
            conflicted = true
          }
        }
        // #6
        if (traitId === 'pyromaniac') {
          incapableOf['fire-fighting'] = true
        }
      } else {
        console.log('trait not found:' + traitId)
      }
      if (!conflicted) {
        traits[traitId] = trait
      }
    }
  }
  for (const [index, levelHex] of levelsHex.entries()) {
    // determine base skill and passion levels
    let level = new BigNumber(levelHex, 16).toNumber()
    let passion = 0
    let capable = true
    const skill = skills[index].name
    while (level > 64) {
      passion = passion + 1
      level = level - 64
    }
    // apply backstory mods 
    const cMod = childhood.mods[skill] || null
    const aMod = adulthood.mods[skill] || null
    if (cMod) {
      level = level + (cMod * 8)
    }
    if (aMod) {
      level = level + (aMod * 8)
    }
    // apply sex mods
    const gMod = sexes[sex].mods[skill] || null
    if (gMod) {
      level = level + (gMod * 8)
    }
    // apply blocks (incapable of)
    if (incapableOf[skill]) {
      capable = false
    }
    // apply violent block?
    if (skill === 'shooting' || skill === 'melee') {
      if (incapableOf['violent']) {
        capable = false
      }
    }
    // apply caring block?
    if (skill === 'medical' || skill === 'animals') {
      if (incapableOf['caring']) {
        capable = false
      }
    }
    // special rule #4
    if (traits.brawler && skill === 'shooting') {
      passion = 0
      console.log('shooting passion reset special rule #4')
    }
    // special rule #5
    if (traits.gourmand && skill === 'cooking') {
      level = level + (4 * 8)
    }
    // reduce level to a more rational base number
    if (level > 0 && capable) {
      level = Math.round(level / 4)
    } else {
      level = 0
      passion = 0
    }
    // push to base skills
    baseSkills.push({
      name: skill,
      level,
      passion,
      capable
    })
  }
  const nf = {
    first: firstName,
    second: secondName,
    family: familyName
  }

  const s = sexes[sex]

  return {
    sex: s,
    name: nf,
    skills: baseSkills,
    childhood: parseBackstory(childhood, nf, s),
    adulthood: parseBackstory(adulthood, nf, s),
    traits,
    incapableOf
  }
}

function parseBackstory(backstory, name, sex) {
  let desc = backstory.replace(/{ PERSONA.NAME }/g, name.first) // name
  // at beginning of sentance (case fix)
  desc = desc.replace(/\. { PERSONA.SUBJECTIVE }/g, '. ' + sex.pronouns.subjective.charAt(0).toUpperCase() + sex.pronouns.subjective.slice(1))
  desc = desc.replace(/\. { PERSONA.OBJECTIVE }/g, '. ' + sex.pronouns.objective.charAt(0).toUpperCase() + sex.pronouns.objective.slice(1))
  desc = desc.replace(/\. { PERSONA.POSSESSIVE }/g, '. ' + sex.pronouns.possessive.charAt(0).toUpperCase() + sex.pronouns.possessive.slice(1))
  // anywhere else
  desc = desc.replace(/{ PERSONA.SUBJECTIVE }/g, sex.pronouns.subjective)
  desc = desc.replace(/{ PERSONA.OBJECTIVE }/g, sex.pronouns.objective)
  desc = desc.replace(/{ PERSONA.POSSESSIVE }/g, sex.pronouns.possessive)
  return desc
}

function stripHexPrefix(str) {
  if (typeof str !== 'string') {
    return str
  }
  return isHexPrefixed(str) ? str.slice(2) : str
}

function isHexPrefixed(str) {
  if (typeof str !== 'string') {
    return false
  }
  return str.slice(0, 2) === '0x'
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}