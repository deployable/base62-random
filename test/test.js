var base62 = require('./index');
var i;
var sts = Date.now()
var count = 100000000
var last_time = Date.now()
for (i = 0; i<count; i++) {
  var id = base62(12)
  if ( ! /^[0-9a-zA-Z]{12}$/.test(id) ){
    throw new Error('Invalid base62: "' + id + '"');
  }
  if (i % 3000000 == 0) {
    var now = Date.now()
    console.log("%s %s", now, now-last_time, i)
    last_time = now
  }
}
var ets = Date.now()
var time = ets - sts
console.log('time: %sms  count: %s  per/s: %s', time, count, count/time*1000)
