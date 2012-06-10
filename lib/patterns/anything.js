var schema = require('../schema')

var AnythingSchema = module.exports = function() {
  return new schema(this)
}

AnythingSchema.prototype = {
  compile : function() {
    return { expression : 'instance != null' }
  },
  
  generate : function() {
    return Number.generate()
  },

  toJSON : function() {
    return { type : 'any', required : true }
  }
}


schema.fromJS.def(function(sch) {
  if (sch === undefined) return new AnythingSchema()
})

schema.fromJSON.def(function(sch) {
  if (sch.type === 'any' && sch.required === true) return new AnythingSchema()
})