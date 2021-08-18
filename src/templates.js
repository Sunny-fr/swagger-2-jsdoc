const mustache = require('mustache')
const defaultTemplate = require('./templates/default.type.tpl')
const objectTemplate = require('./templates/object.type.tpl')
const enumTemplate = require('./templates/enum.type.tpl')
const namespaceTemplate = require('./templates/namespace.type.tpl')


const templateMap = {
  object: objectTemplate,
  string: defaultTemplate,
  enum: enumTemplate,
  namespace: namespaceTemplate
}

const getTemplate = (type) => {
  return templateMap[type] || defaultTemplate
}

const extractEnum = (definitionParams) => {
  return {
    ...definitionParams,
    type: definitionParams.enum.map(value => `"${value}"`).join(' | '),
  }
}

const overridePropertyParams = (definitionParams) => {
  if(definitionParams.type === 'enum') {
    return extractEnum(definitionParams)
  }
  return definitionParams
}

const paramsOverridesRoot = (definitionParams) => {
  if(definitionParams.type === 'enum') {
    return extractEnum(definitionParams)
  }
  if(!definitionParams.properties) {
    return definitionParams
  }
  return {
    ...definitionParams,
    properties: definitionParams.properties.map((_definitionParams) => {
      return overridePropertyParams(_definitionParams)
    })
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
  renderNamespace
}