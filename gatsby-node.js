const path = require("path")
const { profile } = require("./src/pages")

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

  const user = await graphql(`
    {
      allUserUser {
        nodes {
          id
          display_name
          relationships {
            node__auctions {
              title
            }
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
  user.data.allUserUser.nodes.forEach(node => {
    actions.createPage({
      path: "/accountInfo",
      component: path.resolve("./src/templates/accountInfo.js"),
      context: {
        UserName: profile,
      },
    })
  })
}
