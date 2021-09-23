/**
 * @typedef {Object} SwaggerFileInfo
 * @property {Object} contact
 * @property {String} description
 * @property {Object} license
 * @property {String} termsOfService
 * @property {String} title
 * @property {String} version
 */

/**
 * @typedef {object} PropertyDefinition
 * @property {string} type
 * @property {string} format
 */

/**
 * @typedef {object} Definition
 * @property {string} type
 * @property {array<string>} required
 * @property {Object<string, PropertyDefinition>} properties
 */

/**
 * @typedef {object} SwaggerFile
 * @property {String} basePath
 * @property {Object<string, Definition>} definitions
 * @property {Object} externalDocs
 * @property {String} host
 * @property {SwaggerFileInfo} info
 * @property {Object} paths
 * @property {Array} schemes
 * @property {Object} securityDefinitions
 * @property {String} swagger
 * @property {Array} tags
 * @export
 */

/**
 * @typedef {object} OpenAPISwaggerFile
 * @property {String} basePath
 * @property {{schemas: Object<string, Definition>}} components
 * @property {Object} externalDocs
 * @property {String} host
 * @property {SwaggerFileInfo} info
 * @property {Object} paths
 * @property {Array} schemes
 * @property {Object} securityDefinitions
 * @property {String} swagger
 * @property {Array} tags
 * @export
 */
