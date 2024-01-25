const { httpClient } = require('./agent')

/**
 *
 * @param {string} url
 * @param {boolean} [insecure=false]
 * @return {Promise<SwaggerFile>}
 */
const getRemoteSwagger = ({ url, insecure = false }) => {
  return httpClient({ url, insecure })
}

module.exports = {
  getRemoteSwagger,
}
