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
        <Link to="/" activeStyle={{ color: "orange" }}>
          Home
        </Link>
        <Link to="/allAuctions" activeStyle={{ color: "orange" }}>
          All Auctions
        </Link>
        <Link to="/creatAuction" activeStyle={{ color: "orange" }}>
          New Auction
        </Link>
        <Link to="/allBids" activeStyle={{ color: "orange" }}>
          Report
        </Link>
        <Link to="/about" activeStyle={{ color: "orange" }}>
          About
        </Link>

        {loggedIn !== "" ? (
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        ) : (
          ""
        )}
        {loggedIn !== "" ? (
          <Link to="/account" activeStyle={{ color: "orange" }}>
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
