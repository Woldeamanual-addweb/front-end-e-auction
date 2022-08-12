import { Link, graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import { header, btn } from "../styles/home.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Home({ data }) {
  const image = getImage(data.file.childImageSharp.gatsbyImageData)

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
        <GatsbyImage image={image} alt="Banner" />
        <p> </p>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "banner.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
