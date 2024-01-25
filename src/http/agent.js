const fetch = require('node-fetch')
const https = require('https')

/** KISS
 *
 * @param url
 * @param method
 * @param insecure
 */
const httpClient = ({ url, method = 'get', insecure = false }) => {
  return fetch(url, {
    method,
    agent: insecure
      ? new https.Agent({ rejectUnauthorized: false, requestCert: false })
      : undefined,
  }).then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject({
      message: 'error fetching data',
    })
  })
}

module.exports = {
  httpClient,
}
