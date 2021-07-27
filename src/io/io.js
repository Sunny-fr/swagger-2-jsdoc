const fs = require('fs')
/**
 *
 * @param {string} path
 * @return {Promise<SwaggerFile>}
 */
const getLocalSwaggerFile = ({path}) => {
  return new Promise((resolve, reject) => {
    const sourceFile = fs.readFileSync(path, {encoding: 'utf8'})
    try {
      return resolve(JSON.parse(sourceFile))
    } catch (e) {
      console.log(e)
      return reject('Error parsing swagger')
    }
  })
}

const writeJsDoc = (path, contents) => {
  fs.writeFileSync(path, contents, {encoding: 'utf8'})
}

module.exports = {
  writeJsDoc,
  getLocalSwaggerFile
}