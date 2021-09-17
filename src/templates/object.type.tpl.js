const objectTypeTemplate = `
{{=<% %>=}}
/**
 * @typedef {<%{ type }%>} <% name %>
 <% #properties %>
 * @property {<%{ type }%><%{ requirednessFlag }%>} <% name %> <%{ description }%>
 <% /properties %>
 * @export
 */
`

module.exports = objectTypeTemplate
