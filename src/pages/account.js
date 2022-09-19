import { LoadingButton } from "@mui/lab"
import { Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import MuiPhoneNumber from "material-ui-phone-number"
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { BaseUrl } from "../constants/BaseUrl"

export default function Account() {
  const userID = localStorage.getItem("ID")
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({})
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

  const handleSubmit = async e => {
    const req = {
      uid: [
        {
          value: userID,
        },
      ],
      name: [
        {
          value: values["username"],
        },
      ],
      pass: [
        {
          existing: localStorage.getItem("password"),
          value: values["password"],
        },
      ],
      mail: [
        {
          value: values["email"],
        },
      ],

      default_langcode: [
        {
          value: true,
        },
      ],
      path: [
        {
          alias: null,
          pid: null,
          langcode: "en",
        },
      ],
      field_phone: [{ value: values["phone"] }],
    }
    setLoading(true)

    await axios
      .get(BaseUrl + "session/token")
      .then(function (response) {
        const headers = {
          "Content-Type": "application/json",
          "X-CSRF-Token": response,
        }
        axios
          .patch(
            BaseUrl + "user/" + userID + "?_format=json",

            req,

            {
              headers: headers,
            }
          )
          .then(function (response) {
            setLoading(false)
            alert("Successfully updated..")
            console.log(response)
          })
          .catch(function (error) {
            setLoading(false)
            alert("Some error...")
            console.log(error)
          })
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error)
      })
  }
  const getUser = async e => {
    setLoading(true)
    await axios
      .get(BaseUrl + "session/token")
      .then(function (response) {
        const headers = {
          "Content-Type": "application/json",
          "X-CSRF-Token": response,
        }

        axios
          .get(BaseUrl + "user/" + userID + "?_format=json", {
            headers: headers,
          })
          .then(function (response) {
            setLoading(false)
            setValues({
              username: response.data.name[0].value,
              email: response.data.mail[0].value,
            })
            console.log(values)
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

  return values["username"] !== undefined ? (
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
              defaultValue={values["username"]}
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
              defaultValue={values["email"]}
              required
              error={Error}
            />
            <MuiPhoneNumber
              variant="outlined"
              defaultCountry={"et"}
              onChange={e =>
                setValues({
                  ...values,
                  phone: e,
                })
              }
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
  ) : (
    <Layout className="loader-container">
      {" "}
      <div className="loader-container">
        <div className="spinner"></div>
      </div>{" "}
    </Layout>
  )
}
