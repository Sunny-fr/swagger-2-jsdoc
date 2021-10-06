const namespaceTypeTemplate = `{{=<% %>=}}
/**
 * <% namespace %>.<% #description %>
 * <%{ description }%>
 <% /description %><% #version %>
 * @version: <%{ version }%>
 <% /version %>
 * @namespace <% namespace %><% #source %>
 * @see <%{ source }%><% /source %>
 */
`

module.exports = namespaceTypeTemplate
