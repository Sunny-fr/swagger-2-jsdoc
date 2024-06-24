const mustache = require('mustache')
const defaultTemplate = require('./templates/default.type.tpl')
const objectTemplate = require('./templates/object.type.tpl')
const enumTemplate = require('./templates/enum.type.tpl')
const allOfTemplate = require('./templates/allOf.type.tpl')
const arrayTemplate = require('./templates/array.type.tpl')
const namespaceTemplate = require('./templates/namespace.type.tpl')

const templateMap = {
  object: objectTemplate,
  string: defaultTemplate,
  enum: enumTemplate,
  allOf: allOfTemplate,
  namespace: namespaceTemplate,
  array: arrayTemplate,
}

const getTemplate = (type) => {
  return templateMap[type] || defaultTemplate
}

const isEnum = (definitionParams) =>
  definitionParams.type === 'enum' ||
  (definitionParams.type === 'object' && !!definitionParams.enum)

const isAllOf = (definitionParams) => {
  return Array.isArray(definitionParams.allOf)
}

const overridePropertyParams = (definitionParams) => {
  if (isEnum(definitionParams)) {
    return {
      ...definitionParams,
      type: definitionParams.enum.map((value) => `"${value}"`).join(' | '),
    }
  }
  return definitionParams
}
/**
 *
 * @param definitionParams
 * @param {{googleClosureSyntax: boolean}} options
 * @return {(*&{enum: *})|(*&{properties: ((*&{type: *})|*)[]})|*}
 */
const paramsOverridesRoot = (definitionParams, options) => {
  if (isAllOf(definitionParams)) {
    return {
      ...definitionParams,
      allOf: definitionParams.allOf.map((_definitionParams) => {
        const propertyParams = {
          ..._definitionParams,
          optionalStyleEqual:
            !_definitionParams.required && options.googleClosureSyntax,
          optionalStyleBrackets:
            !_definitionParams.required && !options.googleClosureSyntax,
        }
        return overridePropertyParams(propertyParams)
      }),
    }
  }

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
      const propertyParams = {
        ..._definitionParams,
        optionalStyleEqual:
          !_definitionParams.required && options.googleClosureSyntax,
        optionalStyleBrackets:
          !_definitionParams.required && !options.googleClosureSyntax,
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
/**
 *
 * @param {object} definitionParams
 * @param {{googleClosureSyntax: boolean}} options
 * @return {string}
 */
const renderJsDoc = (definitionParams, options) => {
  const template = getTemplate(definitionParams.type)
  const templateData = paramsOverridesRoot(definitionParams, options)
  return mustache.render(template, templateData)
}

module.exports = {
  renderJsDoc,
  renderNamespace,
}
