const mustache = require('mustache')
const defaultTemplate = require('./templates/default.type.tpl')
const objectTemplate = require('./templates/object.type.tpl')
const enumTemplate = require('./templates/enum.type.tpl')
const arrayTemplate = require('./templates/array.type.tpl')
const namespaceTemplate = require('./templates/namespace.type.tpl')

const templateMap = {
  object: objectTemplate,
  string: defaultTemplate,
  enum: enumTemplate,
  namespace: namespaceTemplate,
  array: arrayTemplate,
}

const getTemplate = (type) => {
  return templateMap[type] || defaultTemplate
}

const isEnum = (definitionParams) =>
  definitionParams.type === 'enum' ||
  (definitionParams.type === 'object' && !!definitionParams.enum)

const overridePropertyParams = (definitionParams) => {
  if (isEnum(definitionParams)) {
    return {
      ...definitionParams,
      type: definitionParams.enum.map((value) => `"${value}"`).join(' | '),
    }
  }
  return definitionParams
}

const paramsOverridesRoot = (definitionParams) => {
  if (isEnum(definitionParams)) {
    return {
      ...definitionParams,
      enum: definitionParams.enum.map((value) => `"${value}"`).join(' | '),
    }
  }
  if (!definitionParams.properties) {
    return definitionParams
  }
  return {
    ...definitionParams,
    properties: definitionParams.properties.map((_definitionParams) => {
      const propertyParams = _definitionParams
      propertyParams.requirednessFlag = '='
      if (
        definitionParams.required &&
        definitionParams.required.includes(propertyParams.name)
      ) {
        propertyParams.requirednessFlag = ''
      }
      return overridePropertyParams(propertyParams)
    }),
  }
}
/**
 *
 * @param {{namespace: string}} params
 * @return {*}
 */
const renderNamespace = (params) => {
  const template = getTemplate('namespace')
  return mustache.render(template, params)
}

const renderJsDoc = (definitionParams) => {
  const template = getTemplate(definitionParams.type)
  const templateData = paramsOverridesRoot(definitionParams)
  return mustache.render(template, templateData)
}

module.exports = {
  renderJsDoc,
  renderNamespace,
}
