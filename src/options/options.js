const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String },
  { name: 'outputDirectory', alias: 'd', type: String },
  { name: 'path', alias: 'p', type: String },
  { name: 'url', alias: 'u', type: String },
  {
    name: 'googleClosureSyntax',
    alias: 'g',
    type: Boolean,
    defaultValue: false,
  },
]
/**
 *
 * @return {{
 *   output: string,
 *   outputDirectory: string,
 *   path: string,
 *   url: string,
 *   googleClosureSyntax: boolean
 * }}
 */
const getOptions = () => {
  return commandLineArgs(optionDefinitions)
}

module.exports = {
  getOptions,
}
