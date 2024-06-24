const namespaceTypeTemplate = `{{=<% %>=}}
/**
 * <% namespace %><% #description %>
 * <%{ description }%>
 <% /description %><% #version %>
 * @version: <%{ version }%><% /version %>
 * @namespace <% namespace %><% #memberOf %>
 * @memberOf <%{ memberOf }%><% /memberOf %><% #source %>
 * @see <%{ source }%><% /source %>
 */
 
`

module.exports = namespaceTypeTemplate
