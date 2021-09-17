# swagger-to-jsdoc
Generates jsdoc from a swagger file/url.

## From this sample file (swagger.json)
```json
{
  "swagger": "2.0",
  "info": {
    "title": "Swagger Petstore"
  },
  "definitions": {
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}
```
or open-api version [v3.x petstore-expanded.json](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore-expanded.json)

## To that
```javascript
/**
 * SwaggerPetstore.
 * @namespace SwaggerPetstore
 */

/**
 * @typedef {object} SwaggerPetstore.ApiResponse
 * @property {number=} code
 * @property {string=} type
 * @property {string=} message
 * @export
 */
```

# Installation
Global installation
```
npm i -g swagger-2-jsdoc
```

# As cli :

generates a js file called `output.typedefs.js` from a local swagger file `./swagger.json`

```bash
sw2jd --path=./swagger.json --output=output.typedefs.js
```

generates a js file called `output.typedefs.js` from a remote swagger file `https://petstore.swagger.io/v2/swagger.json`

```bash
sw2jd --url="https://petstore.swagger.io/v2/swagger.json" --output=output.typedefs.js
```

# As npm package:

generates a js file called `output.typedefs.js` from a local swagger file `./swagger.json`

```bash
npm start -- --path=./swagger.json --output=output.typedefs.js
```

generates a js file called `output.typedefs.js` from a remote swagger file `https://petstore.swagger.io/v2/swagger.json`

```bash
npm start -- --url="https://petstore.swagger.io/v2/swagger.json" --output=output.typedefs.js
```

# Reading types in js files
You can reference these generated _types_ in your js files as below:
```javascript
// Step 1: Add the following line at the end of your types (output.typedefs.js) file
export default {}

// Step 2: Import types and link

/** @type {(response: import('./output.typedefs.js').SwaggerPetstore.ApiResponse) => Promise<any>} */
export const handleResponse = async (response) => {
  // auto-complete options
  response.
};

```
