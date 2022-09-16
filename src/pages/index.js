import { Link, graphql } from "gatsby"
import React, { useEffect } from "react"
import Layout from "../components/Layout"
import { header, btn } from "../styles/home.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Home({ data }) {
  const image = getImage(data.file.childImageSharp.gatsbyImageData)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("username")) {
        window.location.pathname = "/login"
      }
    }
  }, [])
  return (
    <Layout>
      <section className={header}>
        <div>
          <h2>BUY</h2>
          <h3>SELL</h3>
          <Link className={btn} to="/allAuctions">
            All auctions
          </Link>
        </div>
        {/* <GatsbyImage image={image} alt="Banner" /> */}
        <img src="/banner.png" width="700" height="600" />
      </section>
    </Layout>
  )
}
export const profile = localStorage.getItem("username")

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "banner.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
