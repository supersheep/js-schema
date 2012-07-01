var schema = require('../schema')

// Object deep equality
var equal = function(a, b) {
  // if a or b is primitive, simple comparison
  if (Object(a) !== a || Object(b) !== b) return a === b
  
  // both a and b must be Array, or none of them
  if ((a instanceof Array) !== (b instanceof Array)) return false
  
  // they must have the same number of properties
  if (Object.keys(a).length !== Object.keys(b).length) return false
  
  // and every property should be equal
  for (var key in a) {
    if (!equal(a[key], b[key])) return false
  }
  
  // if every check succeeded, they are deep equal
  return true
}

var EqualitySchema = module.exports = function(object) {
  this.object = object
  
  return new schema(this)
}

EqualitySchema.prototype = {
  validate : function(instance) {
    return equal(instance, this.object)
  },
  
  toJSON : function() {
    return { 'enum' : [this.object] }
  }
}


schema.fromJS.def(function(sch) {
  if (sch instanceof Array && sch.length === 1) return new EqualitySchema(sch[0])
})