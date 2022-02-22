import assert from 'assert'
import zodiacs from '../src/zodiacs.js'

describe('Zodiacs', function() {
  it('Should contain 12 zodiacs', function() {
    assert.equal(zodiacs.length, 12)
  })
  it('Index 0 should be aquarius', function() {
    assert.equal(zodiacs[0], 'aquarius')
  })
  it('Index 1 should be aries', function() {
    assert.equal(zodiacs[1], 'aries')
  })
  it('Index 2 should be cancer', function() {
    assert.equal(zodiacs[2], 'cancer')
  })
  it('Index 3 should be capricorn', function() {
    assert.equal(zodiacs[3], 'capricorn')
  })
  it('Index 4 should be gemini', function() {
    assert.equal(zodiacs[4], 'gemini')
  })
  it('Index 5 should be leo', function() {
    assert.equal(zodiacs[5], 'leo')
  })
  it('Index 6 should be libra', function() {
    assert.equal(zodiacs[6], 'libra')
  })
  it('Index 7 should be pisces', function() {
    assert.equal(zodiacs[7], 'pisces')
  })
  it('Index 8 should be sagittarius', function() {
    assert.equal(zodiacs[8], 'sagittarius')
  })
  it('Index 9 should be scorpio', function() {
    assert.equal(zodiacs[9], 'scorpio')
  })
  it('Index 10 should be taurus', function() {
    assert.equal(zodiacs[10], 'taurus')
  })
  it('Index 11 should be virgo', function() {
    assert.equal(zodiacs[11], 'virgo')
  })
})