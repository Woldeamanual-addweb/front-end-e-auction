const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(``)

  data.allMarkdownRemark.nodes.forEach(node => {
    actions.createPage({
      path: "/auction/" + node.frontmatter.slug,
      component: path.resolve("./src/templates/auction-details.js"),
      context: { slug: node.frontmatter.slug },
    })
  })
}
