import { Box, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import Layout from "../components/Layout"
import LoadingButton from "@mui/lab/LoadingButton"
import MuiPhoneNumber from "material-ui-phone-number"

const initialValues = {}
export default function Register() {
  const [values, setValues] = useState(initialValues)
  const [Error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const handleChange = e => {
    console.log(e)
  }
  const handleSubmit = async e => {
    setLoading(true)

    await axios
      .get("http://localhost/web/e_auction/web/session/token")
      .then(function (response) {
        const headers = {
          "Content-Type": "application/json",
          "X-CSRF-Token": response,
        }

        axios
          .post(
            "http://localhost/web/e_auction/web/user/register?_format=json",
            {
              name: [{ value: values["username"] }],
              mail: [{ value: values["email"] }],
              pass: [{ value: values["password"] }],
              field_phone: [{ value: values["phone"] }],
            },
            {
              headers: headers,
            }
          )
          .then(function (response) {
            setLoading(false)
            console.log(response)

            if (response.status === 200) {
                window.location.pathname = "/login"

            }
          })
          .catch(function (error) {
            setLoading(false)
            console.log(error)
          })
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error)
      })
  }
  return (
    <Layout>
      <Typography variant="h4">SIGN UP</Typography>
      <Grid container>
        <Grid item xs={8}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
          >
            <TextField
              id="username"
              variant="outlined"
              label="Username"
              name="username"
              onChange={handleInputChange}
              required
              error={Error}
            />
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
            <MuiPhoneNumber
              variant="outlined"
              defaultCountry={"et"}
              onChange={handleChange}
            />

            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              onChange={handleInputChange}
              required
              error={Error}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
          >
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleSubmit}
              color="primary"
              disabled={loading}
            >
              SIGNUP
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}
