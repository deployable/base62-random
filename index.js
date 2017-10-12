'use strict';
/* global window */

(function(){

  var buf
  var str = ''
  var strIdx = 0
  var i
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  // Reduce calls to `crypto` by increasing this number (>=16)
  // Uses a tiny bit more memory to store the random bytes (try 16384)
  var BUFFER_SIZE = 8192

  // Test for uuid
  base62.test = isbase62
  
  // Attach methods for tests to use
  base62.generateBase62Math = generateBase62Math
  base62.generateBase62Node = generateBase62Node
  base62.generateBase62Browser = generateBase62Browser
  base62.initMath = initMath
  base62.initNode = initNode
  base62.initBrowser = initBrowser

  // Node & Browser support
  if ((typeof module !== 'undefined') && (typeof require === 'function')) {
    var crypto = require('crypto')
    module.exports = base62
  } else if (typeof window !== 'undefined') {
    window.base62 = base62
  }

  // Backup method
  function getRandomChar() {
    return chars[Math.floor(Math.random() * (62 - 0)) + 0]
  }

  // base62.test
  function isbase62(str) {
    if (typeof str === 'string') {
      return /^[0-9a-zA-Z]+$/.test(str)
    }
    return false
  }

  function generateBase62Math(){
    for (i = 0; i < BUFFER_SIZE; i++) {
      buf[i] = getRandomChar()
    }
    strIdx = 0
    return str = buf.join('')
  }

  function generateBase62Node(){
    //console.error('generating str',strIdx)
    strIdx = 0
    return str = crypto.randomBytes(BUFFER_SIZE)
      .toString('base64')
      .replace(/[+.=/]/g,'')
  }
 
  // https://github.com/beatgammit/base64-js
  function generateBase62Browser(){
    buf = crypto.getRandomValues(buf)
    var tmp = Array(BUFFER_SIZE)
    for ( i=0; i<BUFFER_SIZE; i++){
      // wastes some bits, some bit pushing should save the extra 4
      tmp.push(chars[buf[i] % 62])
    }
    strIdx = 0
    return str = tmp.join('')
  }

  // Use best RNG as possible
  var generateBase62
  strIdx = BUFFER_SIZE

  function initMath(){
    str = ''
    buf = new Array(BUFFER_SIZE)
    generateBase62 = generateBase62Math
  }
  function initBrowser(){
    str = ''
    buf = new Uint8Array(BUFFER_SIZE)
    generateBase62 = generateBase62Browser 
  }
  function initNode(){
    str = ''
    generateBase62 = generateBase62Node
  }

  if (typeof crypto === 'undefined') {
    initMath()
  }
  else if (crypto.getRandomValues) {
    initBrowser()
  }
  else if (crypto.randomBytes) {
    initNode()
  }
  else {
    throw new Error('Non-standard crypto library')
  }


  // String UUIDv4 (Random)
  function base62(length) {
    if ( !length || typeof length !== 'number') throw new Error('base62 length must be a number "'+length+'"')
    if ( str.length < (strIdx+length) ) generateBase62()
    return str.slice(strIdx, (strIdx+=length))
  }

})()
