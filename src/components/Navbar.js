import { Link, graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"

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
      <div class="links">
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
      </div>
    </nav>
  )
}
