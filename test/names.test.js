import assert from 'assert'
import names from '../src/names.js'

describe('Names', function() {
  describe('Family', function(){
    it('Should contain 4096 family names', function() {
      assert.equal(names.family.length, 4096)
    })
    it('Nakamoto should be at index 1751', function() {
      assert.equal(names.family[1750], 'Nakamoto')
    })
    it('Hashimoto should be at index 2837', function() {
      assert.equal(names.family[2837], 'Hashimoto')
    })
  })
  describe('Male', function(){
    it('Should contain 512 given names (male)', function() {
      assert.equal(names.male.length, 512)
    })
    it('Satoshi should be at index 450', function() {
      assert.equal(names.male[450], 'Satoshi')
    })
    it('Dai should be at index 27', function() {
      assert.equal(names.male[27], 'Dai')
    })
  })
  describe('Female', function(){
    it('Should contain 512 given names (female)', function() {
      assert.equal(names.female.length, 512)
    })
    it('Chika should be at index 50', function() {
      assert.equal(names.female[50], 'Chika')
    })
    it('Yasuko should be at index 507', function() {
      assert.equal(names.female[507], 'Yasuko')
    })
  })
})