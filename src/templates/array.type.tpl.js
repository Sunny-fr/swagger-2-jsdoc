const defaultTypeTemplate = `
{{=<% %>=}}
/**<% #description %>
 * <%{ description }%>
 <% /description %>
* @typedef {<%{ items.type }%>[]} <% name %>
* @export
*/
`

module.exports = defaultTypeTemplate

