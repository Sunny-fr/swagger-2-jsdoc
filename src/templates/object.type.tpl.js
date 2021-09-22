const objectTypeTemplate = `
{{=<% %>=}}
/**
 * @typedef {<%{ type }%>} <% name %>
 <% #properties %>
 * @property {<%{ type }%><% #optionalStyleEqual %>=<% /optionalStyleEqual %>} <% #optionalStyleBrackets %>[<% /optionalStyleBrackets %><% name %><% #optionalStyleBrackets %>]<% /optionalStyleBrackets %> <%{ description }%>
 <% /properties %>
 * @export
 */
`

module.exports = objectTypeTemplate
