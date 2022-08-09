import { Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import { header, btn } from "../styles/home.module.css"

export default function Home() {
  return (
    <Layout>
      <section className={header}>
        <div>
          <h2>Design</h2>
          <h3>Develop</h3>
          <p>Graphics Designer</p>
          <Link className={btn} to="/projects">
            My Projects
          </Link>
        </div>
        <img
          src="/graphics.png"
          alt="site banner"
          style={{ maxWwidth: "100%" }}
        />
        <p> </p>
      </section>
    </Layout>
  )
}
