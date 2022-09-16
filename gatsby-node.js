const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    {
      allNodeAuctions {
        nodes {
          id
          title
          field_dea(fromNow: true)
          field_reserve
          field_item_image {
            alt
          }
          path {
            alias
          }
        }
      }
    }
  `)

  data.allNodeAuctions.nodes.forEach(node => {
    actions.createPage({
      path: node.path.alias,
      component: path.resolve("./src/templates/auction-detail.js"),
      context: { AuctionId: node.id },
    })
  })
}
