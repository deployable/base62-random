# base62-random

Generate random [base62 strings](https://helloacm.com/base62/) quickly with better 
[statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion)
than `Math.random()` unless Math.random is all that's available.

Largely based on [`uuid-random`](https://github.com/jchook/uuid-random)

## Install

    yarn add base62-random
    npm install base62-random

## Example Usage

### Node

```javascript
var base62 = require('base62-random');
base62(12); // 'KsykHbcCzUSL'
```

### Browser

```html
<script src="https://cdn.rawgit.com/deployable/base62-random/v0.3.5/base62-random.min.js"></script>
<script>
  base62(13); // 'BAhl1V1BfUmo3'
</script>
```


### Is base62 string?

```javascript
base62.test('5HXx8Eznu0'); // true
base62.test('P-f6cA4e'); // false
```

## License

MIT

## Links

- Based on [jchook/uuid-random](https://github.com/jchook/uuid-random)
- github [deployable/base62-random](https://github.com/deployable/base62-random)
- npm [base62-random](https://www.npmjs.com/package/base62-random)

