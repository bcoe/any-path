# any-path

[![Build Status](https://travis-ci.org/bcoe/any-path.png)](https://travis-ci.org/bcoe/any-path)
[![Coverage Status](https://coveralls.io/repos/bcoe/any-path/badge.svg?branch=master)](https://coveralls.io/r/bcoe/any-path?branch=master)
[![NPM version](https://img.shields.io/npm/v/any-path.svg)](https://www.npmjs.com/package/any-path)

For when the keys in an object represent paths, and you want
to be able to fetch them regardless of your operating system's
preference for path separators (`\`, `/`).

```javascript
var assert = require('assert')

var ap = require('./')
var o = {
  './node_modules/any-path/package.json': {name: 'any-path'}
}
ap(o) // make any path work.

assert.equal(
  o['.\\node_modules\\any-path\\package.json'].name, 'any-path'
) // lookup works \o/

assert.equal(
  o['./node_modules/any-path/package.json'].name, 'any-path'
) // lookup works \o/

assert.equal(
  o['.\\node_modules/any-path\\package.json'].name, 'any-path'
) // lookup works \o/
```

## License

ISC
