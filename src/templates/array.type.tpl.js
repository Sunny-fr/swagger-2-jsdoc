const defaultTypeTemplate = `
{{=<% %>=}}
/**<% #description %>
 * <%{ description }%>
 <% /description %>
* @typedef {<%{ type }%><<%{ items.type }%>>} <% name %>
* @export
*/
`

module.exports = defaultTypeTemplate

