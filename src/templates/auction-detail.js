import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured } from "../styles/project-details.module.css"
import { graphql } from "gatsby"
import CountdownTimer from "../components/CountdownTimer"
import PropTypes from "prop-types"
import BidForm from "../components/Form/Bid.Form"
import Box from "@material-ui/core/Box"
import axios from "axios"
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { useCountdown } from "../useCountdown"

export default function AuctionDetails({ data }) {
  const auction = data.nodeAuctions
  var endDate = new Date(auction.field_dea).getTime()
  const [bids, setBids] = useState([])
  const [bestBid, setBestBid] = useState("")

  const [days, hours, minutes, seconds] = useCountdown(endDate)

  const getBids = async e => {
    await axios
      .post(
        "http://localhost/web/e_auction/web/api/bids?_format=json",
        {
          nid: auction.drupal_internal__nid,
        },
        {
          auth: {
            username: "aman",
            password: "aman",
          },
        }
      )
      .then(function (response) {
        setBids(response.data.Bids)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getBestBid = async e => {
    await axios
      .post(
        "http://localhost/web/e_auction/web/api/bestbid?_format=json",
        {
          nid: auction.drupal_internal__nid,
        },
        {
          auth: {
            username: "aman",
            password: "aman",
          },
        }
      )
      .then(function (response) {
        if (response.data.Best[0]) {
          setBestBid(response.data.Best[0])
        }
      })
      .catch(function (error) {
        alert(error)
      })
  }
  useEffect(() => {
    getBids()
    getBestBid()
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("username")) {
        window.location.pathname = "/login"
      }
    }
  }, [])
  return (
    <Layout>
      <div className={details}>
        <CountdownTimer targetDate={endDate} />
        <h2>{auction.title}</h2>
        <Grid container>
          <Grid item xs={6}>
            <h3>$ {auction.field_reserve}</h3>
          </Grid>

          <Grid item xs={6}>
            <Box noValidates>
              {bestBid !== "" ? (
                <Button variant="contained" color="secondary">
                  Best Bid{" "}
                  <Typography variant="h4"> $ {bestBid.bid}</Typography>
                </Button>
              ) : (
                ""
              )}
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        {auction.relationships.field_item_image.map(auctionImage => (
          <div className={featured}>
            <GatsbyImage
              image={auctionImage.localFile.childImageSharp.gatsbyImageData}
            />
          </div>
        ))}
      </div>

      {days + hours + minutes + seconds <= 0 ? (
        <div></div>
      ) : (
        <BidForm nodeId={auction.drupal_internal__nid} />
      )}
      <Box>
        {bids ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bidder </TableCell>
                  <TableCell align="right">Bid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids.map(row => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.uid ? row.uid.name[0].value : "Loading"}
                    </TableCell>
                    <TableCell align="right">{row.bid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h2"> No bids available</Typography>
        )}
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
      drupal_internal__nid
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
