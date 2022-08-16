import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured, html } from "../styles/project-details.module.css"
import { graphql } from "gatsby"
import CountdownTimer from "../components/CountdownTimer"
import PropTypes from "prop-types"

export default function AuctionDetails({ data }) {
  const auction = data.nodeAuctions
  console.log(data)
  var endDate = new Date(auction.field_dea).getTime()
  const dateTimeAfterThreeDays = endDate

  return (
    <Layout>
      <div className={details}>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        <h2>{auction.title}</h2>
        <h3>$ {auction.field_reserve}</h3>
        <div className={featured}>
          {auction.relationships.field_item_image.map(auctionImage => (
            <img
              src={auctionImage.localFile.publicURL}
              alt=""
              srcset=""
              width="500"
              height="600"
            />
          ))}
        </div>
        <div className={html} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
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
          }
        }
      }
    }
  }
`
