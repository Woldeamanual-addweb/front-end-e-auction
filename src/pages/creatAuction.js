import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import React, { useState } from "react"
import Container from "@mui/material/Container"
import Layout from "../components/Layout"

const initialValues = {
  id: 0,
  itemImage: "",
}
export default function CreatAuction() {
  const [values, setValues] = useState(initialValues)
  const [Error, setError] = useState(false)
  const [recentness, setRecentness] = useState("")

  const handleChange = event => {
    setRecentness(event.target.value)
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    if (value === "") {
      console.log("empty")
      setError(true)
    } else {
      setError(false)

      setValues({
        ...values,
        [name]: value,
      })
    }
  }

  const handleSubmit = e => {
    var temp = values
    console.log(values)
    fetch("http://localhost/web/e_auction/web/api/v1/auctions")
      .then(res => res.json())
      .then(data => console.log(data))
  }
  return (
    <Layout>
      <Typography variant="h4">Create Auction</Typography>
      <form noValidate>
        <Grid container>
          <Grid item xs={6}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
            >
              <TextField
                id="title"
                variant="outlined"
                label="Title"
                name="Title"
                onChange={handleInputChange}
                required
                error={Error}
              />
              <TextField
                id="reserve"
                variant="outlined"
                type="number"
                label="reserve"
                name="reserve"
                onChange={handleInputChange}
                error={Error}
                required
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary"
              >
                Create Auction
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
            >
              <TextField
                name="itemImage"
                type="file"
                onChange={handleInputChange}
              />
              <Select
                labelId="recentness"
                id="recentness"
                label="Recentness"
                error={Error}
                value={recentness}
                onChange={handleChange}
              >
                <MenuItem value="New" color="secondary">
                  New
                </MenuItem>
                <MenuItem value="Used" color="secondary">
                  Used
                </MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}
