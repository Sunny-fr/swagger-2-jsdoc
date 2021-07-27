# swagger-to-jsdoc
Generates jsdoc from a swagger file/url


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
