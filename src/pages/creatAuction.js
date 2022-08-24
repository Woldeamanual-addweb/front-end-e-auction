import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import Container from "@mui/material/Container"
import Layout from "../components/Layout"

const initialValues = {
  id: 0,
  title: "",
  reserve: "",
}
export default function creatAuction() {
  const handleInputChange = e => {
    const { name, value } = e.target
    console.log(name)
  }
  const handleSubmit = e => {
    console.log("Submitted")
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
                //   error={bidError}
                required
              />
              <TextField
                id="reserve"
                variant="outlined"
                type="number"
                label="reserve"
                name="reserve"
                onChange={handleInputChange}
                //   error={bidError}
                required
              />
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleInputChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

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
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
            >
              <TextField name="itemImage" type="file" />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}
