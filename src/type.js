const typesMap = {
  object: 'object',
  string: 'string',
  integer: 'number',
  array: 'array',
  enum: 'enum',
}

//const DEFINITION_FORMAT = '#/definitions/{definition}'

function getDefinitionFromType(type, namespace) {
  const definitionReg = new RegExp('#/definitions/([A-z0-9-]*)', 'g')
  const exec = definitionReg.exec(type)
  if (!!exec && !!exec[1]) {
    return `${!!namespace ? namespace + '.' : ''}${exec[1]}`
  }
  return null
}
function getSchemaFromType(type, namespace) {
  const schemaReg = new RegExp('#/components/schemas/([A-z0-9-]*)', 'g')
  const exec = schemaReg.exec(type)
  if (!!exec && !!exec[1]) {
    return `${!!namespace ? namespace + '.' : ''}${exec[1]}`
  }
  return null
}

const findType = (type, namespace = '') => {
  const definitionReg = getDefinitionFromType(type, namespace)
  const schemaReg = getSchemaFromType(type, namespace)
  return definitionReg || schemaReg || type
}

const getMainType = (definition, namespace) => {
  const definitionType = findType(
    definition.$ref || definition.type || '',
    namespace
  )
  const hasImplicitObjectDefinition = !definitionType && !!definition.properties
  if (!!definition.enum) {
    return typesMap['enum']
  }
  if (hasImplicitObjectDefinition) {
    return typesMap['object']
  }
  return typesMap[definitionType] || definitionType
}
/**
 *
 * @param type
 * @param definition
 * @param namespace
 * @return {string}
 */
const getSubType = (type, definition, namespace) => {
  if (type === 'array' && !!definition?.items?.$ref) {
    const ref = definition?.items?.$ref || ''
    const _definition = { type: ref }
    return getMainType(_definition, namespace)
  }
  return ''
}

/**
 * @param {string} namespace
 * @param {Object} definition
 * @param {?string} definition.type
 * @param {?string} definition.items
 * @param {?string} definition.$ref
 * @return {string} type
 */

const getType = (definition, namespace) => {
  const type = getMainType(definition, namespace)
  const subType = getSubType(type, definition, namespace)
  if (!!subType) {
    return `${type}<${subType}>`
  }
  return type
}

module.exports = {
  findType,
  getType,
}
