import { Link, graphql, useStaticQuery } from "gatsby"
import React, { useEffect } from "react"

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
  const { title } = data.site.siteMetadata
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      window.location.pathname = "/login"
    }
  }, [])
  return (
    <nav>
      <h1> {title} </h1>
      <div class="links">
        <Link to="/">Home</Link>
        <Link to="/allAuctions">All Auctions</Link>
        <Link to="/creatAuction">New Auction</Link>
        <Link to="/allBids">Report</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  )
}
