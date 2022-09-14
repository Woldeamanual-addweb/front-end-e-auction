import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout"
import { portfolio, projects } from "../../styles/projects.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { Typography } from "@mui/material"

export default function Auctions({ data }) {
  const auctions = data.auctions.nodes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("username")) {
        window.location.pathname = "/login"
      }
    }
  }, [])
  return (
    <Layout>
      <div className={portfolio}>
        <Typography variant="h2">All Auctions</Typography>
        <div className={projects}>
          {auctions.map(auction => (
            <Link to={auction.path.alias}>
              <div key={auction.id}>
                <GatsbyImage
                  image={
                    auction.relationships.field_item_image[0]?.localFile
                      .childImageSharp.gatsbyImageData
                  }
                />

                <h3>{auction.title}</h3>
                <p>$ {auction.field_reserve}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
// export page query

export const query = graphql`
  query AuctionsPage {
    auctions: allNodeAuctions(sort: { fields: created, order: DESC }) {
      nodes {
        id
        title
        field_dea
        field_reserve
        field_item_image {
          alt
        }
        path {
          alias
        }
        relationships {
          field_item_image {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
