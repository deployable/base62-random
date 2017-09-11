"use strict";

(function(){

  var buf;
  var str = '';
  var strIdx = 0;
  var i;

  // Reduce calls to crypto by increasing this numberr (>=16)
  // Uses a tiny bit more memory to store the random bytes (try 16384)
  var BUFFER_SIZE = 8192;


  // Binary uuids (even faster)

  // Test for uuid
  base62.test = isbase62;

  // Node & Browser support
  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    var crypto = require('crypto');
    module.exports = base62;
  } else if (typeof window !== 'undefined') {
    window.base62 = base62;
  }

  // Backup method
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  function getRandomChar() {
    return chars[Math.floor(Math.random() * (62 - 0)) + 0];
  }

  // base62.test
  function isbase62(str) {
    if (typeof str === 'string') {
      return /^[0-9a-zA-Z]+$/.test(str);
    }
    return false
  }


  function generateBase62Math(){
    for (i = 0; i < BUFFER_SIZE; i++) {
      buf[i] = getRandomChar();
    }
    str = buf.join('')
    strIdx = 0
  }

  function generateBase62Node(){
    //console.error('generating str',strIdx)
    str = crypto.randomBytes(BUFFER_SIZE).toString('base64').replace(/[\+\=\/]/g,'');
    strIdx = 0
  }
 
  // https://github.com/beatgammit/base64-js
  function generateBase62Browser(){
    buf = crypto.getRandomValues(buf);
    var tmp = Array(BUFFER_SIZE)
    for (i=0; i<BUFFER_SIZE; i++){
      tmp.push(chars[buf[i] % 62]);
    }
    str = tmp.join('');
    strIdx = 0
  }

  // Use best RNG as possible
  var generateBase62;
  strIdx = BUFFER_SIZE

  if (typeof crypto === 'undefined') {
     buf = new Array(BUFFER_SIZE);
     generateBase62 = generateBase62Math
  }
  else if (crypto.getRandomValues) {
     buf = new Uint8Array(BUFFER_SIZE);
     generateBase62 = generateBase62Browser 
  }
  else if (crypto.randomBytes) {
     generateBase62 = generateBase62Node
  }
  else {
     throw new Error('Non-standard crypto library');
  }


  // String UUIDv4 (Random)
  function base62(length) {
    if ( str.length < (strIdx+length) ) generateBase62()
    return str.slice(strIdx, (strIdx+=length))
  }

})();
