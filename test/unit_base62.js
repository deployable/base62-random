
const base62 = require('../')

describe('base62', function(){

  it('should export a function', function(){
    expect( base62 ).to.be.a('function')
  })

  it('should return a string', function(){
    expect( base62(2) ).to.be.a('string')
  })

  it('should return a string', function(){
    expect( base62(6) ).to.be.match(/^[0-9a-z]{6}$/i)
  })

})
