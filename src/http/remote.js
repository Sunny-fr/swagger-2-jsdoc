const {httpClient} = require('./agent')

/**
 *
 * @param {string} url
 * @return {Promise<SwaggerFile>}
 */
const getRemoteSwagger = ({url}) => {
  return httpClient({url})
}

module.exports = {
  getRemoteSwagger
}