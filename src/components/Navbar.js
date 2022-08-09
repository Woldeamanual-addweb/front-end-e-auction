import { Link } from "gatsby"
import React from "react"

export default function Navbar() {
  return (
    <nav>
      <h1> W </h1>
      <div class="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/Graphics">Graphics</Link>
      </div>
    </nav>
  )
}
