const defaultTypeTemplate = `
{{=<% %>=}}
/**<% #description %>
 * <%{ description }%><% /description %>
 * @typedef {<%{ type }%>} <% name %>
 * @export
 */
`

module.exports = defaultTypeTemplate

