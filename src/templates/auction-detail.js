import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured, bidder } from "../styles/project-details.module.css"
import { graphql } from "gatsby"
import CountdownTimer from "../components/CountdownTimer"
import PropTypes from "prop-types"
import BidForm from "../components/Form/Bid.Form"
import Box from "@material-ui/core/Box"

import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]

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
        {auction.relationships.field_item_image.map(auctionImage => (
          <div className={featured}>
            {/* <img
              src={auctionImage.localFile.publicURL}
              alt="AUCTION ITEM"
              srcset=""
              width="500"
              height="600"
            /> */}
            <GatsbyImage
              image={auctionImage.localFile.childImageSharp.gatsbyImageData}
            />
          </div>
        ))}
      </div>
      <BidForm />
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  {" "}
                  <Typography color="textSecondary" variant="h6">
                    User
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Amount
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    align="left"
                    className={bidder}
                  >
                    <Typography color="Primary" variant="h6">
                      {row.name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories} $
                  </StyledTableCell>
                </StyledTableRow>
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
