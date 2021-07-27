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

const paramsOverrides = (definitionParams) => {
  if(definitionParams.type === 'enum') {
    return {
      ...definitionParams,
      // override needed because mustache js doesnt support removing the last trailing "|"
      enum: definitionParams.enum.map(value => `"${value}"`).join(' | ')
    }
  }
  return definitionParams
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
  return mustache.render(template, paramsOverrides(definitionParams))
}

module.exports = {
  renderJsDoc,
  renderNamespace
}