import { LoadingButton } from "@mui/lab"
import { Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import MuiPhoneNumber from "material-ui-phone-number"
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"

export default function Account() {
  const userID = localStorage.getItem("ID")
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [Error, setError] = useState(false)
  const initialValues = {}

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
  }
  const getUser = async e => {
    setLoading(true)
    console.log(userID)
    await axios
      .get("http://localhost/web/e_auction/web/session/token")
      .then(function (response) {
        const headers = {
          "Content-Type": "application/json",
          "X-CSRF-Token": response,
        }

        axios
          .get(
            "http://localhost/web/e_auction/web/user/" +
              userID +
              "?_format=json",

            {
              headers: headers,
            }
          )
          .then(function (response) {
            setLoading(false)

            console.log(response)
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

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Layout>
      <Typography variant="h4">User Profile</Typography>
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
              Update Profile
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Layout>
    // <Layout>
    //   {loading ? (
    //     <div>"LOADING ..."</div>
    //   ) : (
    //     <div>{localStorage.getItem("username")}</div>
    //   )}
    // </Layout>
  )
}
