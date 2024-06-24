const { findType } = require('./type')
const { getType } = require('./type')

/**
 *
 * @param {string} name
 * @param {array<string>} [requiredProperties=[]]
 * @return {boolean} param is required
 */
const isRequired = ({ name, requiredProperties = [] }) => {
  return requiredProperties.includes(name)
}

/**
 *
 * @param {object} typeDefinition
 * @param {string} name
 * @param {string} namespace
 * @param {boolean} required
 * @return {*&{name, namespace, type: string, required}}
 */
const getObjectProperties = ({ typeDefinition, name, namespace, required }) => {
  const type = getType(typeDefinition, namespace)
  return {
    ...typeDefinition,
    name,
    namespace,
    type,
    required,
  }
}
const prepareDefinitions = (name, definition, namespace) => {
  const type = getType(definition, namespace)
  const base = {
    ...definition,
    type: type,
    name: !!namespace ? `${namespace}.${name}` : name,
    namespace: namespace,
  }
  if (!type && Array.isArray(definition.allOf)) {
    return {
      ...base,
      allOf: definition.allOf.map((allOf) => findType(allOf, namespace)),
    }
  }
  if (type === 'enum') {
    return {
      ...base,
      enum: base.enum.map((enumValue) => findType(enumValue, namespace)),
    }
  }
  if (type === 'object') {
    return {
      ...base,
      properties: Object.keys(base.properties || {}).reduce((arr, property) => {
        const typeDefinition = base.properties[property]
        const required = Array.isArray(definition.required)
          ? isRequired({
              name: property,
              requiredProperties: definition.required,
            })
          : true
        return arr.concat(
          getObjectProperties({
            name: property,
            typeDefinition,
            property,
            namespace,
            required,
          })
        )
      }, []),
    }
  }
  return base
}

/**
 * @param {SwaggerFile|OpenAPISwaggerFile} swagger - swagger object
 * @returns {object} swagger definitions
 */
function getDefinitions(swagger) {
  if (swagger.definitions) return swagger.definitions
  return swagger?.components?.schemas || {}
}

module.exports = {
  prepareDefinitions,
  getDefinitions,
}
