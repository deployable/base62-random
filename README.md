# base62-random

Generate random base62 strings
[random UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29)
with better 
[statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()` unless Math.random is all that's available.

Largely based on [`uuid-random`](https://github.com/jchook/uuid-random)

## Install

    npm install base62-random


## Example Usage

### Node

```javascript
var uuid = require('base62-random');
base62(12); // 'xxx'
```

### Browser

```html
<script src="base62-random.min.js"></script>
<script>
  base62(13); // 'b96ab5e6-f1e8-4653-ab08-4dd82ea65778'
</script>
```


### Is base62 string?

```javascript
base62.test('f14A4r2e'); // true
base62.test('P-f6cA4e'); // false
```

## License

MIT

Based on https://github.com/jchook/uuid-random
