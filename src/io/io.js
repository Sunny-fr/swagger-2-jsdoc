const fs = require('fs')
/**
 *
 * @param {string} path
 * @return {Promise<SwaggerFile>}
 */
const getLocalSwaggerFile = ({ path }) => {
  return new Promise((resolve, reject) => {
    const sourceFile = fs.readFileSync(path, { encoding: 'utf8' })
    try {
      return resolve(JSON.parse(sourceFile))
    } catch (e) {
      console.log(e)
      return reject('Error parsing swagger')
    }
  })
}

/**
 *
 * @param {string} path
 * @param {string} contents
 */
const writeJsDoc = (path, contents) => {
  fs.writeFileSync(path, contents, { encoding: 'utf8' })
}

/**
 *
 * @param {string} path
 * @param {SwaggerFile} swagger
 */
const writeSwagger = (path, swagger) => {
  fs.writeFileSync(path, JSON.stringify(swagger, null, 2), { encoding: 'utf8' })
}

module.exports = {
  writeJsDoc,
  getLocalSwaggerFile,
  writeSwagger,
}
