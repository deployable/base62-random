
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
  
  it('should successfully test a base62 string', function(){
    expect( base62.test('1234qwerXCZV') ).to.be.true
  })

  it('should fail test on a non base62 string', function(){
    expect( base62.test('-V') ).to.be.false
  })

  it('should fail test on a non string', function(){
    expect( base62.test({}) ).to.be.false
  })

})
