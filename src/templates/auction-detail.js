import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured, html } from "../styles/project-details.module.css"
import { graphql } from "gatsby"
import CountdownTimer from "../components/CountdownTimer"

export default function AuctionDetails({ data }) {
  const { html } = data.markdownRemark
  const { title, stack, featuredImg } = data.markdownRemark.frontmatter
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS

  return (
    <Layout>
      <div className={details}>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        <h2>title</h2>
        <h3>auction</h3>
        <div className={featured}>
          {/* <GatsbyImage image={featuredImg.childImageSharp.gatsbyImageData} /> */}
        </div>
        {/* <div className={html} dangerouslySetInnerHTML={{ __html: html }} /> */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectDetails($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        stack
        featuredImg {
          childImageSharp {
            gatsbyImageData
          }
        }
        title
      }
    }
  }
`
