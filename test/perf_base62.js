var base62 = require('../');

describe('base62', function(){

  it('should run more than 200000/s', function(){
    var sts = Date.now()
    var last_time = Date.now()
    var count = 2000000
    for ( var i=0; i<count; i++ ) {
      var id = base62(12)
      //console.log(id)
      if ( ! /^[0-9a-zA-Z]{12}$/.test(id) ){
        throw new Error('Invalid base62: "' + id + '"');
      }
      //if (i % 3000000 == 0) {
      //  var now = Date.now()
      //  console.log("%s %s", now, now-last_time, i)
      //  last_time = now
      //}
    }
    var ets = Date.now()
    var time = ets - sts
    //console.log('time: %sms  count: %s  per/s: %s', time, count, count/time*1000)
    expect( count/time*1000 ).to.be.greaterThan( 2000000 )
  })

})
