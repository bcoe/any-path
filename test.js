/* global describe, it */

var anyPath = require('./')
require('chai').should()
require('tap').mochaGlobals()

describe('any-test', function () {
  it('handles windows style paths', function (done) {
    var o = anyPath({
      './foo/bar/README.md': 99
    })
    o['.\\foo\\bar\\README.md'].should.equal(99)
    return done()
  })

  it('handles *nix style paths', function (done) {
    var o = anyPath({
      '.\\foo\\bar\\README.md': 99
    })

    o['./foo/bar/README.md'].should.equal(99)
    return done()
  })

  it('handles mixed paths', function (done) {
    var o = {
      './foo\/bar/README.md': 99
    }

    anyPath(o)

    o['.\\foo/bar\\README.md'].should.equal(99)
    return done()
  })

  it('handles no path', function (done) {
    var o = {
      'README.md': 99
    }

    anyPath(o)

    o['README.md'].should.equal(99)
    return done()
  })
})
