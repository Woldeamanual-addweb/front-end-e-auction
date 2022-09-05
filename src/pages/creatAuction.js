import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import Select from "@mui/material/Select"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Stack } from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import * as moment from "moment"
import { LoadingButton } from "@mui/lab"

const initialValues = {}
export default function CreatAuction() {
  const [values, setValues] = useState(initialValues)
  const [Error, setError] = useState(false)
  const [recentness, setRecentness] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [itemImage, setItemImage] = useState("")
  const [loading, setLoading] = useState(false)
  const handleChange = e => {
    setRecentness(e.target.value)
  }
  const handleImageChange = e => {
    setItemImage(e.target.files[0])
    console.log(e)
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
    setLoading(true)

    var temp = values
    temp["recentness"] = recentness
    console.log(values)
    axios
      .post(
        "http://localhost/web/e_auction/web/node?_format=json",
        {
          type: [{ target_id: "auctions" }],
          title: [{ value: values["title"] }],
          field_reserve: [{ value: values["reserve"] }],
          field_dea: [{ value: moment(selectedDate).format() }],
          field_item_image: [
            {
              target_id: 10,
            },
          ],
          body: null,
          status: [{ value: true }],
        },
        {
          auth: {
            username: "aman",
            password: "aman",
          },
        }
      )
      .then(function (response) {
        setLoading(false)
        console.log(response)
        alert("Auction is Live")
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error)
      })
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("username")) {
        window.location.pathname = "/login"
      }
    }
  }, [])
  return (
    <Layout>
      <Typography variant="h4">Create Auction</Typography>
      <Grid container>
        <Grid item xs={6}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
          >
            <TextField
              id="title"
              variant="outlined"
              label="Title"
              name="title"
              onChange={handleInputChange}
              required
              error={Error}
            />
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-amount">
                Reserve
              </InputLabel>
              <OutlinedInput
                variant="outlined"
                type="number"
                label="Reserve"
                name="reserve"
                onChange={handleInputChange}
                error={Error}
                required
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
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
              onChange={handleImageChange}
            />
            <Select
              labelId="recentness"
              id="recentness"
              label="Recentness"
              error={Error}
              value={recentness}
              onChange={handleChange}
              color="primary"
            >
              <MenuItem value="1" color="primary" text>
                <Typography color="primary">New</Typography>
              </MenuItem>
              <MenuItem value="2">
                <Typography color="primary">Used</Typography>
              </MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={4} sx={{ width: "250px" }}>
                <DateTimePicker
                  color="secondary"
                  label="End Date"
                  renderInput={params => <TextField {...params} />}
                  value={selectedDate}
                  onChange={newValue => {
                    setSelectedDate(newValue)
                  }}
                />
              </Stack>
            </LocalizationProvider>{" "}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
          >
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              loading={loading}
            >
              Create Auction
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}
