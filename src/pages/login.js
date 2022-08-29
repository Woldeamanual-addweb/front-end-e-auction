import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material"
import Select from "@mui/material/Select"
import axios from "axios"
import React, { useState } from "react"
import Layout from "../components/Layout"

const initialValues = {}
export default function Login() {
  const [values, setValues] = useState(initialValues)
  const [Error, setError] = useState(false)

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
    temp["recentness"] = recentness
    console.log(values)
    // axios
    //   .post(
    //     "http://localhost/web/e_auction/web/node?_format=json",
    //     {
    //       type: [{ target_id: "auctions" }],
    //       title: [{ value: values["title"] }],
    //       field_reserve: [{ value: values["reserve"] }],
    //       field_dea: [{ value: moment(selectedDate).format() }],

    //       body: null,
    //       status: [{ value: true }],
    //     },
    //     {
    //       auth: {
    //         username: "aman",
    //         password: "aman",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response)
    //     alert("Auction is Live")
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }
  return (
    <Layout>
      <Typography variant="h4">Login</Typography>
      <form noValidate>
        <Grid container>
          <Grid item xs={6}>
            <Box
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
            >
              <TextField
                id="email"
                variant="outlined"
                label="Email"
                name="email"
                type="email"
                onChange={handleInputChange}
                required
                error={Error}
              />
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Password
                </InputLabel>
                <TextField
                  id="password"
                  variant="outlined"
                  label="Oassword"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  required
                  error={Error}
                />
              </FormControl>
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
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary"
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}
