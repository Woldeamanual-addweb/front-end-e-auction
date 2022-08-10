import { Link, graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import { header, btn } from "../styles/home.module.css"
import Img from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Home({ data }) {
  const image = getImage(data.file.childImageSharp.gatsbyImageData)

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
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`
