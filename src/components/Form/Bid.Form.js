import React, { useState } from "react"
import PanToolIcon from "@mui/icons-material/PanTool"
import { Box, Button, Grid, IconButton, TextField } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import axios from "axios"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { LoadingButton } from "@mui/lab"
import { BaseUrl } from "../../constants/BaseUrl"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const initialValues = {
  id: 0,
  bid: "",
  user: "",
}

export default function BidForm(props) {
  const [values, setValues] = useState(initialValues)
  const [bidError, setBidError] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    if (values["bid"] === "") {
      setBidError(true)
    }
    if (values["bid"] <= props.reserve) {
      setLoading(false)
      toast("Below Reserve", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
      return
    }
    await axios
      .post(
        BaseUrl + "api/placebid?_format=json",
        {
          nid: props.nodeId,
          amount: values["bid"],
        },
        {
          auth: {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          },
        }
      )
      .then(function (response) {
        setLoading(false)

        alert("Bet is Placed")
      })
      .catch(function (error) {
        setLoading(false)

        console.log(error)
      })
  }
  const handleDelete = async e => {
    setLoading(true)

    setOpen(false)
    console.log(props.nodeId)

    await axios
      .post(
        BaseUrl + "api/bid_delete?_format=json",
        {
          nid: props.nodeId,
        },
        {
          auth: {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          },
        }
      )
      .then(function (response) {
        setLoading(false)

        alert("Deleted")
      })
      .catch(function (error) {
        setLoading(false)

        console.log(error)
      })
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container>
      <ToastContainer />

      <Grid item xs={6}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "21ch" },
          }}
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
          <LoadingButton
            loading={loading}
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
          </LoadingButton>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleClickOpen}
            color="warning"
            endIcon={
              <IconButton aria-label="betDelete">
                <DeleteForeverIcon />
              </IconButton>
            }
          >
            Delete Bid
          </LoadingButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Bid </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You sure you want to Delete you bid ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button autoFocus onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  )
}
