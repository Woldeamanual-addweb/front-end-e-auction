import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured } from "../styles/project-details.module.css"
import { graphql } from "gatsby"
import CountdownTimer from "../components/CountdownTimer"
import PropTypes from "prop-types"
import BidForm from "../components/Form/Bid.Form"
import Box from "@material-ui/core/Box"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

function createData(bidder, amount) {
  return { bidder, amount }
}

const rows = [
  createData("Aman", 159),
  createData("Visha", 237),
  createData("Eshreq", 262, 16.0),
  createData("Kotu", 305, 3.7),
]
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
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Bidder </TableCell>
                <TableCell align="right">Bid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.bidder}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.bidder}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
