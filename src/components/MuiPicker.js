import React, { useState } from "react"
import { Stack, TextField } from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

export default function MuiPicker() {
  const [selectedDate, setSelectedDate] = useState(null)
  console.log(selectedDate)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={4} sx={{ width: "250px" }}>
        <DateTimePicker
          label="End Date"
          renderInput={params => <TextField {...params} />}
          value={selectedDate}
          onChange={newValue => {
            setSelectedDate(newValue)
          }}
        />
      </Stack>
    </LocalizationProvider>
  )
}
