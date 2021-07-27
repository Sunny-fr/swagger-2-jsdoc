# swagger-to-jsdoc
Generates jsdoc from a swagger file/url

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

## To that
```javascript
/**
* SwaggerPetstore.
* @namespace SwaggerPetstore
*/

/**
* @typedef {object} SwaggerPetstore.ApiResponse
* @property {number} code
* @property {string} type
* @property {string} message
* @export
*/
```


#installation
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
