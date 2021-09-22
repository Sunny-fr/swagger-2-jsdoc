#!/usr/bin/env node
const { getRemoteSwagger } = require('./http/remote')
const { getOptions } = require('./options/options')
const { slugify, capitalize } = require('./utils/string')
const { renderNamespace } = require('./templates')
const { renderJsDoc } = require('./templates')
const { prepareDefinitions, getDefinitions } = require('./definitions')
const { getLocalSwaggerFile, writeJsDoc } = require('./io/io')
const { messages } = require('./errors/messages')

const print = console.log

/**
 *
 * @param {string} path - example "input/petstore-swagger.json"
 * @param {string} url - example "https://petstore.swagger.io/v2/swagger.json"
 * @param {string} [output]
 * @param {string} [outputDirectory="output"]
 * @return {Promise<{outputPath: string}>}
 */
async function init({ path, url, output, outputDirectory = 'output/' }) {
  try {
    const swagger = !!url
      ? await getRemoteSwagger({ url })
      : await getLocalSwaggerFile({ path })
    const swaggerName = swagger?.info?.title || 'Untitled swagger'
    const swaggerSlug = slugify(swaggerName)
    const swaggerNamespace = capitalize(swaggerSlug, '-').split('-').join('')
    const outputPath =
      output ||
      `${outputDirectory}${
        outputDirectory.endsWith('/') ? '' : '/'
      }${swaggerSlug}.typedefs.js`
    const base = !!swaggerNamespace
      ? renderNamespace({ namespace: swaggerNamespace })
      : ''
    const definitions = getDefinitions(swagger)
    const contents = Object.keys(definitions).reduce((prev, name) => {
      const definition = definitions[name]
      const params = prepareDefinitions(name, definition, swaggerNamespace)
      const currentJsDoc = renderJsDoc(params)
      return prev + currentJsDoc
    }, base)

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
