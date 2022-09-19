import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { BaseUrl } from "../constants/BaseUrl"

export default function AllBids() {
  const [bids, setBids] = useState([])
  const getAllBids = async e => {
    await axios
      .post(
        BaseUrl + "api/allbids?_format=json",
        {},
        {
          auth: {
            username: "aman",
            password: "aman",
          },
        }
      )
      .then(function (response) {
        if (response.data) {
          setBids(response.data.All_Bids)

          console.log(response.data.All_Bids)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("username")) {
        window.location.pathname = "/login"
      }
    }

    getAllBids()
  }, [])
  return (
    <Layout>
      <div>
        <Typography variant="h3" sx={{ mb: 3 }}>
          All Bids{" "}
        </Typography>
        <Box>
          {bids ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" color="primary">
                        BIDDER
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h6" color="primary">
                        ITEM
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="primary">
                        BID
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bids.map(row => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.bidder ? row.bidder.name[0].value : "Loading"}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.node ? row.node.title[0].value : "Loading"}
                      </TableCell>
                      <TableCell align="right">{row.bid} $</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h2"> No bids available</Typography>
          )}
        </Box>
      </div>
    </Layout>
  )
}
