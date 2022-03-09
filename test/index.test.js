import assert from 'assert'
import { getPersona, getPersonaNFT } from '../src/index.js'

describe('getPersona', function() {
  const persona1 = getPersona('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58')
  describe('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58', function(){
    it('Success should be true', function() {
      assert.equal(persona1.success, true)
    })
    it('Sex should be male', function() {
      assert.equal(persona1.sex, 'male')
    })
    it('Given name should be Kazufumi', function() {
      assert.equal(persona1.name.given, 'Kazufumi')
    })
    it('Family name should be Takeuchi', function() {
      assert.equal(persona1.name.family, 'Takeuchi')
    })
    it('Zodiac should be leo', function() {
      assert.equal(persona1.zodiac, 'leo')
    })
  })
  const persona2 = getPersona('0xaeb7897adf9b1309d7ef2dca6f3f6afb65358abd')
  describe('0xaeb7897adf9b1309d7ef2dca6f3f6afb65358abd', function(){
    it('Success should be true', function() {
      assert.equal(persona2.success, true)
    })
    it('Sex should be female', function() {
      assert.equal(persona2.sex, 'female')
    })
    it('Given name should be Sayuri', function() {
      assert.equal(persona2.name.given, 'Sayuri')
    })
    it('Family name should be Matsumoto', function() {
      assert.equal(persona2.name.family, 'Matsumoto')
    })
    it('Zodiac should be gemini', function() {
      assert.equal(persona2.zodiac, 'gemini')
    })
  })
  const persona3 = getPersona('0x3eA7Cc0F434b8711cf6bCD0d49eEDF67A8233Af9')
  describe('0x3eA7Cc0F434b8711cf6bCD0d49eEDF67A8233Af9', function(){
    it('Success should be true', function() {
      assert.equal(persona3.success, true)
    })
    it('Sex should be male', function() {
      assert.equal(persona3.sex, 'male')
    })
    it('Given name should be Hideaki', function() {
      assert.equal(persona3.name.given, 'Hideaki')
    })
    it('Family name should be Adachi', function() {
      assert.equal(persona3.name.family, 'Adachi')
    })
    it('Zodiac should be aries', function() {
      assert.equal(persona3.zodiac, 'aries')
    })
  })
  const persona4 = getPersona('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4')
  describe('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', function(){
    it('Success should be true', function() {
      assert.equal(persona4.success, true)
    })
    it('Sex should be female', function() {
      assert.equal(persona4.sex, 'female')
    })
    it('Given name should be Esta', function() {
      assert.equal(persona4.name.given, 'Esta')
    })
    it('Family name should be Sugiyama', function() {
      assert.equal(persona4.name.family, 'Sugiyama')
    })
    it('Zodiac should be cancer', function() {
      assert.equal(persona4.zodiac, 'cancer')
    })
  })
  const persona5 = getPersona('36bJ4iqZbNevh9b9kzaMEkXb28Gpqrv2bd')
  describe('36bJ4iqZbNevh9b9kzaMEkXb28Gpqrv2bd', function(){
    it('Success should be true', function() {
      assert.equal(persona5.success, true)
    })
    it('Sex should be female', function() {
      assert.equal(persona5.sex, 'female')
    })
    it('Given name should be Kei', function() {
      assert.equal(persona5.name.given, 'Kei')
    })
    it('Family name should be Ikegaya', function() {
      assert.equal(persona5.name.family, 'Ikegaya')
    })
    it('Zodiac should be cancer', function() {
      assert.equal(persona5.zodiac, 'cancer')
    })
  })
  const invalidPersona = getPersona('NOT_A_VALID_ADDRESS')
  describe('Invalid address', function(){
    it('Success should be false', function() {
      assert.equal(invalidPersona.success, false)
    })
    it('Error should be descriptive', function() {
      assert.equal(invalidPersona.error, "NOT_A_VALID_ADDRESS is not a valid bitcoin or ethereum style address")
    })
  })
})

describe('getPersonaNFT', function() {
  const punk6529 = getPersonaNFT('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', 6529, 1)
  describe('punk6529', function(){
    it('Success should be true', function() {
      assert.equal(punk6529.success, true)
    })
    it('Sex should be female', function() {
      assert.equal(punk6529.sex, 'female')
    })
    it('Given name should be Mieko', function() {
      assert.equal(punk6529.name.given, 'Mieko')
    })
    it('Family name should be Kubota', function() {
      assert.equal(punk6529.name.family, 'Kubota')
    })
    it('Zodiac should be sagittarius', function() {
      assert.equal(punk6529.zodiac, 'sagittarius')
    })
  })
  const punk6529M = getPersonaNFT('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', 6529, 1, 'male')
  describe('punk6529 with sex override (male)', function(){
    it('Success should be true', function() {
      assert.equal(punk6529M.success, true)
    })
    it('Sex should be male', function() {
      assert.equal(punk6529M.sex, 'male')
    })
    it('Given name should be Kiyoshi', function() {
      assert.equal(punk6529M.name.given, 'Kiyoshi')
    })
    it('Family name should be Kubota', function() {
      assert.equal(punk6529M.name.family, 'Kubota')
    })
    it('Zodiac should be sagittarius', function() {
      assert.equal(punk6529M.zodiac, 'sagittarius')
    })
  })
  const punk6529Alt = getPersonaNFT('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', 6529, 8)
  describe('punk6529 on alternate chain (chainId: 8)', function(){
    it('Success should be true', function() {
      assert.equal(punk6529Alt.success, true)
    })
    it('Sex should be female', function() {
      assert.equal(punk6529Alt.sex, 'female')
    })
    it('Given name should be Shihomi', function() {
      assert.equal(punk6529Alt.name.given, 'Shihomi')
    })
    it('Family name should be Hoshino', function() {
      assert.equal(punk6529Alt.name.family, 'Hoshino')
    })
    it('Zodiac should be libra', function() {
      assert.equal(punk6529Alt.zodiac, 'libra')
    })
  })
  const punk6529AltM = getPersonaNFT('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB', 6529, 8, 'male')
  describe('punk6529 on alternate chain (chainId: 8) with sex override (male)', function(){
    it('Success should be true', function() {
      assert.equal(punk6529AltM.success, true)
    })
    it('Sex should be male', function() {
      assert.equal(punk6529AltM.sex, 'male')
    })
    it('Given name should be Masakatsu', function() {
      assert.equal(punk6529AltM.name.given, 'Masakatsu')
    })
    it('Family name should be Hoshino', function() {
      assert.equal(punk6529AltM.name.family, 'Hoshino')
    })
    it('Zodiac should be libra', function() {
      assert.equal(punk6529AltM.zodiac, 'libra')
    })
  })
})