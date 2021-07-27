const objectTypeTemplate = `
{{=<% %>=}}
/**
* @typedef {<%{ type }%>} <% name %>
<% #properties %>
* @property {<%{ type }%>} <% name %>
<% /properties %>
* @export
*/
`

module.exports = objectTypeTemplate