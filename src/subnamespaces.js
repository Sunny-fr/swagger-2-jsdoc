const { renderNamespace } = require('./templates')

/** @typedef {object} SubNamespace
 * @property {string} name
 * @property {string} memberOf
 * @property {SubNamespace[]} members
 * @export
 */

/**
 *
 * @param {string} namespace
 * @param {string[]} names
 * @returns {SubNamespace[]}
 */

function getSubNamespacesFromDefinitionName(namespace, names) {
  const namespaceMap = {}

  names.forEach((name) => {
    const parts = name.split('.')
    let currentNamespace = namespaceMap
    parts.forEach((part, index) => {
      const fullName = `${namespace}.${parts.slice(0, index + 1).join('.')}`

      if (!currentNamespace[fullName]) {
        currentNamespace[fullName] = {
          name: fullName,
          memberOf:
            index === 0
              ? namespace
              : `${namespace}.${parts.slice(0, index).join('.')}`,
          members: {},
        }
      }
      currentNamespace = currentNamespace[fullName].members
    })
  })

  function convertToNestedArray(map) {
    return Object.values(map).map((ns) => ({
      name: ns.name,
      memberOf: ns.memberOf,
      members: convertToNestedArray(ns.members),
    }))
  }

  const result = convertToNestedArray(namespaceMap)

  return result.length ? result : []
}

module.exports = {
  getSubNamespacesFromDefinitionName,
}

/**
 *
 * @param {SubNamespace[]} subNamespaces
 * @param {string} [base]
 */

function renderSubNamespaces(subNamespaces, base = '') {
  return subNamespaces.reduce((prev, ns) => {
    if (ns.members.length > 0) {
      return (
        prev +
        renderNamespace({
          namespace: ns.name,
          memberOf: ns.memberOf,
        })
      )
    }
    return prev
  }, base)
}

module.exports = {
  getSubNamespacesFromDefinitionName,
  renderSubNamespaces,
}
