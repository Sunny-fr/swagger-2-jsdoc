const enumTypeTemplate = `
{{=<% %>=}}
/**<% #description %>
 * <%{ description }%><% /description %>
 * @typedef {<%{ allOf }%>} <% name %>
 * @export
 */
`

module.exports = enumTypeTemplate
