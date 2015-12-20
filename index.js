module.exports = function (obj) {
  for (var prop in obj) {
    if (hasOwnProperty.call(obj, prop)) {
      setupHooks(prop, obj, obj[prop])
    }
  }

  return obj
}

function setupHooks (prop, obj, value) {
  var paths = allPaths(prop.split(/[\\/]/g))

  paths.forEach(function (path) {
    obj.__defineGetter__(path, function () {
      return value
    })
    obj.__defineSetter__(path, function (newValue) {
      value = newValue
    })
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
