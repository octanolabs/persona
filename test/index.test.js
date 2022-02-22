import assert from 'assert'
import { getPersona } from '../src/index.js'

describe('getPersona', function() {
  const persona1 = getPersona('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58')
  // {
  //   sex: 'male',
  //   name: { given: 'Masaatsu', family: 'Tōgō' },
  //   zodiac: 'leo'
  // }
  describe('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58', function(){
    it('Sex should be male', function() {
      assert.equal(persona1.sex, 'male')
    })
    it('Given name should be Masaatsu', function() {
      assert.equal(persona1.name.given, 'Masaatsu')
    })
    it('Family name should be Tōgō', function() {
      assert.equal(persona1.name.family, 'Tōgō')
    })
    it('Zodiac should be leo', function() {
      assert.equal(persona1.zodiac, 'leo')
    })
  })
  const persona2 = getPersona('0xaeb7897adf9b1309d7ef2dca6f3f6afb65358abd')
  // {
  //   sex: 'female',
  //   name: { given: 'Minami', family: 'Matsumiya' },
  //   zodiac: 'gemini'
  // }
  describe('0xaeb7897adf9b1309d7ef2dca6f3f6afb65358abd', function(){
    it('Sex should be female', function() {
      assert.equal(persona2.sex, 'female')
    })
    it('Given name should be Minami', function() {
      assert.equal(persona2.name.given, 'Minami')
    })
    it('Family name should be Matsumiya', function() {
      assert.equal(persona2.name.family, 'Matsumiya')
    })
    it('Zodiac should be gemini', function() {
      assert.equal(persona2.zodiac, 'gemini')
    })
  })
})