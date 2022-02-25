import assert from 'assert'
import names from '../src/names.js'

describe('Names', function() {
  describe('Family', function(){
    it('Should contain 4096 family names', function() {
      assert.equal(names.family.length, 4096)
    })
    it('Nakamoto should be at index 2282', function() {
      assert.equal(names.family[2282], 'Nakamoto')
    })
    it('Hashimoto should be at index 2036', function() {
      assert.equal(names.family[2036], 'Hashimoto')
    })
  })
  describe('Male', function(){
    it('Should contain 512 given names (male)', function() {
      assert.equal(names.male.length, 512)
    })
    it('Satoshi should be at index 118', function() {
      assert.equal(names.male[118], 'Satoshi')
    })
    it('Reiji should be at index 27', function() {
      assert.equal(names.male[27], 'Reiji')
    })
  })
  describe('Female', function(){
    it('Should contain 512 given names (female)', function() {
      assert.equal(names.female.length, 512)
    })
    it('Moeko should be at index 50', function() {
      assert.equal(names.female[50], 'Moeko')
    })
    it('Itsumi should be at index 507', function() {
      assert.equal(names.female[507], 'Itsumi')
    })
  })
})