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
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays =
    NOW_IN_MS +
    auction.return(
      <Layout>
        <div className={details}>
          <CountdownTimer targetDate={dateTimeAfterThreeDays} />
          <h2>{auction.title}</h2>
          <h3>$ {auction.field_reserve}</h3>
          <div className={featured}>
            {/* <img src={auction.field_item_image} alt="" srcset=""> */}
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
      field_dea(fromNow: true)
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
