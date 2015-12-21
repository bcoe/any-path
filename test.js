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

  it('updates all permutations when a simple value is changed', function (done) {
    var o = anyPath({
      '.\\foo\\bar\\README.md': 99
    })
    o['./foo/bar/README.md'] = 202

    o['./foo\/bar/README.md'].should.equal(202)
    o['.\\foo\\bar\\README.md'].should.equal(202)
    return done()
  })

  it("updates all permutations when an inner object's value is changed", function (done) {
    var o = anyPath({
      '.\\foo\\bar\\README.md': {name: 'README.md'}
    })
    o['./foo/bar/README.md'].name = 'package.json'

    o['./foo\/bar/README.md'].name.should.equal('package.json')
    o['.\\foo\\bar\\README.md'].name.should.equal('package.json')
    return done()
  })

  describe('restore', function () {
    it('returns object back to its initial state', function (done) {
      var o = anyPath({
        '.\\foo\\bar\\README.md': {name: 'README.md'}
      })
      o.__restore__().should.deep.equal({
        '.\\foo\\bar\\README.md': {name: 'README.md'}
      })
      return done()
    })
  })
})
