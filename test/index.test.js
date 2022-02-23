import assert from 'assert'
import { getPersona } from '../src/index.js'

describe('getPersona', function() {
  const persona1 = getPersona('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58')
  describe('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58', function(){
    it('Success should be true', function() {
      assert.equal(persona1.success, true)
    })
    it('Sex should be male', function() {
      assert.equal(persona1.sex, 'male')
    })
    it('Given name should be Kiichi', function() {
      assert.equal(persona1.name.given, 'Kiichi')
    })
    it('Family name should be Oshikawa', function() {
      assert.equal(persona1.name.family, 'Oshikawa')
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
    it('Given name should be Maki', function() {
      assert.equal(persona2.name.given, 'Maki')
    })
    it('Family name should be Isawa', function() {
      assert.equal(persona2.name.family, 'Isawa')
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
    it('Given name should be Kotaro', function() {
      assert.equal(persona3.name.given, 'Kotaro')
    })
    it('Family name should be Yokozawa', function() {
      assert.equal(persona3.name.family, 'Yokozawa')
    })
    it('Zodiac should be aries', function() {
      assert.equal(persona3.zodiac, 'aries')
    })
  })
  const invalidPersona = getPersona('notavalidaddress')
  describe('Invalid address', function(){
    it('Success should be false', function() {
      assert.equal(invalidPersona.success, false)
    })
    it('Error should be descriptive', function() {
      assert.equal(invalidPersona.error, "notavalidaddress is not a valid Ubiq/Ethereum address")
    })
  })
})