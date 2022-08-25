import React, { useState } from "react"
import PanToolIcon from "@mui/icons-material/PanTool"
import { Box, Button, Grid, IconButton, TextField } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
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
  const handleSubmit = e => {
    if (values["bid"] === "") {
      setBidError(true)
    }
  }
  const handleDelete = e => {
    if (values["bid"] === "") {
      setBidError(true)
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
            noValidate
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
