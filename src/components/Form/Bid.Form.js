import React, { useState } from "react"
import PanToolIcon from "@mui/icons-material/PanTool"
import { Box, Button, Grid, IconButton, TextField } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import axios from "axios"
const initialValues = {
  id: 0,
  bid: "",
  user: "",
}
export default function BidForm(props) {
  const [values, setValues] = useState(initialValues)
  const [bidError, setBidError] = useState(false)

  const handleInputChange = e => {
    const { name, value } = e.target
    if (value >= 0) {
      setBidError(false)

      setValues({
        ...values,
        [name]: value,
      })
    } else {
      alert("Below zero")
    }
  }
  const handleSubmit = async e => {
    if (values["bid"] === "") {
      setBidError(true)
    }
    await axios
      .post(
        "http://localhost/web/e_auction/web/api/placebid?_format=json",
        {
          nid: props.nodeId,
          amount: values["bid"],
        },
        {
          auth: {
            username: "aman",
            password: "aman",
          },
        }
      )
      .then(function (response) {
        alert("Bet is Placed")
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleDelete = e => {
    if (values["bid"] === "") {
      setBidError(true)
    }
    else if(values['bid']!=""){
        await axios
      .post(
        "http://localhost/web/e_auction/web/api/bid_delete?_format=json",
        {
          nid: props.nodeId,
        },
        {
          auth: {
            username: "aman",
            password: "aman",
          },
        }
      )
      .then(function (response) {
        alert("Bid deleted Successfully")
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    
  }
  return (
    <Grid container>
      <Grid item xs={6}>
        <form noValidate>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "21ch" },
            }}
            noValidates
            autoComplete="off"
          >
            <TextField
              id="amount"
              variant="outlined"
              label="Bid"
              name="bid"
              type="number"
              onChange={handleInputChange}
              error={bidError}
              required
            />
            <Button
              variant="contained"
              endIcon={
                <IconButton aria-label="bet" color="primary">
                  <PanToolIcon />
                </IconButton>
              }
              onClick={handleSubmit}
              color="primary"
            >
              Place Bid
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              color="warning"
              endIcon={
                <IconButton aria-label="betDelete">
                  <DeleteForeverIcon />
                </IconButton>
              }
            >
              Delete Bid
            </Button>{" "}
          </Box>
        </form>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  )
}
