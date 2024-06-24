#!/usr/bin/env node
const { getRemoteSwagger } = require('./http/remote')
const { getOptions } = require('./options/options')
const { slugify, capitalize } = require('./utils/string')
const { renderNamespace } = require('./templates')
const { renderJsDoc } = require('./templates')
const { prepareDefinitions, getDefinitions } = require('./definitions')
const { getLocalSwaggerFile, writeJsDoc } = require('./io/io')
const { messages } = require('./errors/messages')
const {
  getSubNamespacesFromDefinitionName,
  renderSubNamespaces,
} = require('./subnamespaces')

const print = console.log

/**
 *
 * @param {string} path - example "input/petstore-swagger.json"
 * @param {string} url - example "https://petstore.swagger.io/v2/swagger.json"
 * @param {string} [output]
 * @param {string} [name] - Custom name for the namespace (will be slugified)
 * @param {string} [outputDirectory="output"]
 * @param {boolean} [googleClosureSyntax=false]
 * @param {boolean} [insecure=false]
 * @return {Promise<{outputPath: string}>}
 */
async function init({
  path,
  url,
  output,
  outputDirectory = 'output/',
  googleClosureSyntax = false,
  name,
  insecure = false,
}) {
  try {
    const swagger = !!url
      ? await getRemoteSwagger({ url, insecure })
      : await getLocalSwaggerFile({ path })
    const swaggerName = name || swagger?.info?.title || 'Untitled swagger'
    const swaggerSlug = slugify(swaggerName)
    const swaggerNamespace = capitalize(swaggerSlug, '-').split('-').join('')
    const outputPath =
      output ||
      `${outputDirectory}${
        outputDirectory.endsWith('/') ? '' : '/'
      }${swaggerSlug}.typedefs.js`
    const base = !!swaggerNamespace
      ? renderNamespace({
          namespace: swaggerNamespace,
          source: url,
          description: swagger?.info?.description,
          version: swagger?.info?.version,
        })
      : ''

    const definitions = getDefinitions(swagger)

    const subNamespaces = getSubNamespacesFromDefinitionName(
      swaggerNamespace,
      Object.keys(definitions)
    )

    const renderedSubNamespaces = renderSubNamespaces(subNamespaces)

    const baseWithSubNamespaces = base + renderedSubNamespaces

    const contents = Object.keys(definitions).reduce((prev, name) => {
      const definition = definitions[name]

      const params = prepareDefinitions(name, definition, swaggerNamespace)
      const currentJsDoc = renderJsDoc(params, { googleClosureSyntax })
      return prev + currentJsDoc
    }, baseWithSubNamespaces)

    writeJsDoc(outputPath, contents)

    return Promise.resolve({
      outputPath,
    })
  } catch (e) {
    //
    return Promise.reject(e)
  }
}

const prepare = () => {
  const options = getOptions()
  if (!options.path && !options.url) {
    print(messages.noPathNoUrl())
    return
  }
  if (!!options.path && !!options.url) {
    print(messages.bothPathAndUrl())
    return
  }

  init({
    path: options.path,
    url: options.url,
    output: options.output,
    outputDirectory: options.outputDirectory,
    googleClosureSyntax: options.googleClosureSyntax,
    name: options.name,
    insecure: options.insecure,
  })
    .then(({ outputPath }) => {
      print(messages.success({ outputPath }))
    })
    .catch((e) => {
      print(messages.unknownError())
      print(e)
    })
}

prepare()
