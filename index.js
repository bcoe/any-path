function AnyPath (obj) {
  for (var prop in obj) {
    if (hasOwnProperty.call(obj, prop)) {
      setupHooks(prop, obj, obj[prop])
    }
  }

  return obj
}

function setupHooks (prop, obj, value) {
  var paths = allPaths(prop.split(/[\\/]/g))
  var getter = function () {
    return obj[prop]
  }

  // put the object back into its initial state.
  obj.__restore__ = function () {
    for (var prop in obj) {
      if (hasOwnProperty.call(obj, prop)) {
        if (obj.__lookupGetter__(prop) === getter) delete obj[prop]
      }
    }
    delete obj.__restore__

    return obj
  }

  // expand the object to have all possible paths.
  paths.forEach(function (path) {
    if (path !== prop) {
      obj.__defineGetter__(path, getter)

      obj.__defineSetter__(path, function (newValue) {
        obj[prop] = newValue
      })
    }
  })
}

// recursively walk all combinations of paths:
// /foo/bar/hello.md
// \foo\bar\hello.md
// ... etc.
function allPaths (splitPath, partialPath, finalPaths, i) {
  i = i || 0
  finalPaths = finalPaths || []
  partialPath = (partialPath || '') + splitPath[i]

  if (i >= splitPath.length - 1) {
    finalPaths.push(partialPath)
  } else {
    allPaths(splitPath, partialPath + '/', finalPaths, i + 1)
    allPaths(splitPath, partialPath + '\\', finalPaths, i + 1)
  }

  return finalPaths
}

module.exports = AnyPath
