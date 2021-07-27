function noPathNoUrl () {
  return `
  
---------------------
Please provide a path to a swagger file
  --path=somewhere/swagger.json
Or please provide a url to a swagger file
  --url=https://petstore.swagger.io/v2/swagger.json
---------------------
    `
}

function bothPathAndUrl () {
  return `
  
---------------------
You provided both an URL and a Path
URL will be used and path ignored
---------------------
    `
}

/**
 *
 * @param {string} outputPath
 * @return {string}
 */
function success({outputPath}){
  return `
  
---------------------
JsDoc file is generated with success !
Your file is located here : ${outputPath}
---------------------

    `
}

function unknownError(){
  return `
  
---------------------
  An Error occurred !
---------------------
    `
}

const messages = {
  bothPathAndUrl,
  noPathNoUrl,
  success,
  unknownError
}
module.exports = {
  messages
}