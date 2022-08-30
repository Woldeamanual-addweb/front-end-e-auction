import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import Layout from "../components/Layout"
import LoadingButton from "@mui/lab/LoadingButton"

const initialValues = {}
export default function Login() {
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
            "http://localhost/web/e_auction/web/user/login?_format=json",
            {
              name: values["username"],
              pass: values["password"],
            },
            {
              headers: headers,
            }
          )
          .then(function (response) {
            setLoading(false)
            if (response.status === 200) {
              localStorage.setItem("username", response.data.current_user.name)
              window.location.pathname = "/"
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
                id="username"
                variant="outlined"
                label="Username"
                name="username"
                onChange={handleInputChange}
                required
                error={Error}
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
                Login
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}
