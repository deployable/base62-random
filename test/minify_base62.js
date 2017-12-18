/* eslint env: { "mocha": true } */
const base62 = require('../base62-random.min.js')

function possiblyDescribe(test, name, fn){
  if (test) return describe(name, fn)
  xdescribe(name, fn)
}

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
  
  it('should error on a undefined method param', function(){
    let fn = ()=> base62()
    expect( fn ).to.throw(/base62 length must be a number "undefined"/i)
  })
  
  it('should error on a string method param', function(){
    let fn = ()=> base62('a')
    expect( fn ).to.throw(/base62 length must be a number "a"/i)
  })

  it('should not carc it on a float', function(){
    expect( base62(4.4) ).to.match(/^[0-9a-z]{4}/i)
    expect( base62(4.9) ).to.match(/^[0-9a-z]{4}/i)
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
  
  describe('Math.random', function(){
    
    before('reset string', function(){
      expect( base62.initMath() ).to.be.undefined
    })

    it('should run the backup Math.random', function(){
      expect( base62.generateBase62Math() ).to.be.ok
    })
   
    it('should return a string', function(){
      expect( base62(2) ).to.be.a('string')
    })

    it('should return a base62 string the correct length', function(){
      expect( base62(6) ).to.be.match(/^[0-9a-z]{6}$/i)
    })

  })

  possiblyDescribe((typeof window === 'undefined'), 'crypto.randomBytes', function(){
    
    before('reset string', function(){
      expect( base62.initNode() ).to.be.undefined
    })

    it('should run the backup Math.random', function(){
      expect( base62.generateBase62Node() ).to.be.ok
    })
   
    it('should return a string', function(){
      expect( base62(2) ).to.be.a('string')
    })

    it('should return a base62 string the correct length', function(){
      expect( base62(6) ).to.be.match(/^[0-9a-z]{6}$/i)
    })

  })

  possiblyDescribe((typeof windows !== 'undefined'), 'window.crypto.getRandomValues', function(){
    
    before('reset string', function(){
      expect( base62.initBrowser() ).to.be.undefined
    })

    it('should run the backup Math.random', function(){
      expect( base62.generateBase62Browser() ).to.be.ok
    })
   
    it('should return a string', function(){
      expect( base62(2) ).to.be.a('string')
    })

    it('should return a base62 string the correct length', function(){
      expect( base62(6) ).to.be.match(/^[0-9a-z]{6}$/i)
    })

  })

})
