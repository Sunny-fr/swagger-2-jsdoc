const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String },
  { name: 'path', alias: 'p', type: String },
  { name: 'url', alias: 'u', type: String }
]

//const options = commandLineArgs(optionDefinitions)

const getOptions = () => {
  return commandLineArgs(optionDefinitions)
}

module.exports = {
  getOptions
}
