const fs = require('fs')
const mustache = require('mustache')

const defaultTemplate = fs.readFileSync('./src/templates/default.type.tpl', {encoding: 'utf8'})
const objectTemplate = fs.readFileSync('./src/templates/object.type.tpl', {encoding: 'utf8'})
const enumTemplate = fs.readFileSync('./src/templates/enum.type.tpl', {encoding: 'utf8'})
const namespaceTemplate = fs.readFileSync('./src/templates/namespace.type.tpl', {encoding: 'utf8'})


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