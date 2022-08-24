import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured } from "../styles/project-details.module.css"
import { graphql } from "gatsby"
import CountdownTimer from "../components/CountdownTimer"
import PropTypes from "prop-types"
import BidForm from "../components/Form/Bid.Form"
import Box from "@material-ui/core/Box"

export default function AuctionDetails({ data }) {
  const auction = data.nodeAuctions
  useEffect(() => {
    fetch("http://localhost/web/e_auction/web/api/v1/auctions")
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  var endDate = new Date(auction.field_dea).getTime()

  return (
    <Layout>
      <div className={details}>
        <CountdownTimer targetDate={endDate} />
        <h2>{auction.title}</h2>
        <h3>$ {auction.field_reserve}</h3>
        {auction.relationships.field_item_image.map(auctionImage => (
          <div className={featured}>
            <GatsbyImage
              image={auctionImage.localFile.childImageSharp.gatsbyImageData}
            />
          </div>
        ))}
      </div>
      <BidForm />
      <Box></Box>
    </Layout>
  )
}
AuctionDetails.propTypes = {
  data: PropTypes.object.isRequired,
}
export const query = graphql`
  query ($AuctionId: String!) {
    nodeAuctions(id: { eq: $AuctionId }) {
      id
      title
      created(fromNow: true)
      field_dea
      field_reserve
      field_item_image {
        alt
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
`
