import { Button, Grid, makeStyles, TextField } from "@material-ui/core"
import React, { useState } from "react"

const useStyle = makeStyles(theme => ({
  root: {
    "& .MuiInputBase-root": {
      width: "80%",
      color: "white",
    },
  },
}))
const initialValues = {
  id: 0,
  bid: "",
  user: "",
}
export default function BidForm() {
  const [values, setValues] = useState(initialValues)
  const classes = useStyle()

  const handleInputChange = e => {
    const { name, value } = e.target
    if (value >= 0) {
      setValues({
        ...values,
        [name]: value,
      })
    } else {
      alert("Below zero")
    }
  }
  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Bid"
            name="bid"
            type="number"
            value={values.bid}
            onChange={handleInputChange}
            color="secondary"
          />
          <Button variant="contained" color="Secondary">
            Place Bid
          </Button>
        </Grid>
        <Grid item xs={6}>
          {" "}
        </Grid>
      </Grid>
    </form>
  )
}
