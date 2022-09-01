import { Link, graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import { deepOrange, deepPurple } from "@mui/material/colors"

export default function Navbar() {
  const data = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("username"))
  const { title } = data.site.siteMetadata
  const logout = e => {
    localStorage.setItem("username", "")
    window.location.pathname = "/login"
  }
  return (
    <nav>
      <h1> {title} </h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/allAuctions">All Auctions</Link>
        <Link to="/creatAuction">New Auction</Link>
        <Link to="/allBids">Report</Link>
        {loggedIn !== "" ? (
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        ) : (
          ""
        )}
        {loggedIn !== "" ? (
          <Link>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {localStorage.getItem("username")[0]}
            </Avatar>
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  )
}
