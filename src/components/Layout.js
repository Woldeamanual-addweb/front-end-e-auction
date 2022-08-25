import React from "react"
import Navbar from "./Navbar"
import "../styles/global.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { green, orange, black } from "@mui/material/colors"

export default function Layout({ children }) {
  const customtheme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      dark: "#003366",
    },
  })
  return (
    <ThemeProvider theme={customtheme}>
      <div className="layout">
        <Navbar />
        <div className="content">{children}</div>
        <footer>
          <p>Copyright 2022 Auction</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}
