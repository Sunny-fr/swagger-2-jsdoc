const enumTypeTemplate = `
{{=<% %>=}}
/**<% #description %>
 * <%{ description }%>
 <% /description %>
 * @typedef {<%{ enum }%>} <% name %>
 * @export
 */
`

module.exports = enumTypeTemplate
