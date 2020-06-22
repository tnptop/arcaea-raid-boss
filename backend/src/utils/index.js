'use strict'

// with assumption that the two arrays share the same length
exports.applyObjectSchema = (valueArray, schemaArray) => {
  return schemaArray.reduce((obj, key, ind) => {
    return Object.assign({}, obj, { [key]: valueArray[ind] })
  }, {})
}
