# swagger-to-jsdoc
Generates jsdoc from a swagger file/url




# As npm package:

generates a js file called `output.typedefs.js` from a local swagger file `./swagger.json`

```javascript

npm start -- --path=./swagger.json --output=output.typedefs.js

```


generates a js file called `output.typedefs.js` from a remote swagger file `https://petstore.swagger.io/v2/swagger.json`

```javascript

npm start -- --url="https://petstore.swagger.io/v2/swagger.json" --output=output.typedefs.js

```
