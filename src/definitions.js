const {findType} = require('./type')
const {getType} = require('./type')

const getObjectProperties = (def, name, namespace) => {
  const type = getType(def, namespace)
  return {
    ...def,
    name,
    namespace,
    type
  }
}
const prepareDefinitions = (name, definition, namespace) => {
  const type = getType(definition, namespace)
  const base = {
    ...definition,
    type: type,
    name: !!namespace ? `${namespace}.${name}` : name,
    namespace: namespace
  }
  if(type === 'enum') {
    return {
      ...base,
      enum: base.enum.map(enumValue => findType(enumValue, namespace))
    }
  }
  if(type === 'object') {
    return {
      ...base,
      properties: Object.keys(base.properties || {}).reduce((arr, property) => {
        const def = base.properties[property]
        return arr.concat(getObjectProperties(def, property, namespace))
      }, [])
    }
  }
  return base
}

module.exports = {
  prepareDefinitions
}