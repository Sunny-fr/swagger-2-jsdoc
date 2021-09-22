const fetch = require('node-fetch')

/** KISS
 *
 * @param url
 * @param method
 */
const httpClient = ({ url, method = 'get' }) => {
  return fetch(url, {
    method,
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
