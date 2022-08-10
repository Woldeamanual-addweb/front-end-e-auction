import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { details, featured, html } from "../styles/project-details.module.css"
import { graphql } from "gatsby"

export default function ProjectDetails({ data }) {
  const { html } = data.markdownRemark
  const { title, stack, featuredImg } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <div className={details}>
        <h2>{title}</h2>
        <h3>{stack}</h3>
        <div className={featured}>
          <GatsbyImage image={featuredImg.childImageSharp.gatsbyImageData} />
        </div>
        <div className={html} dangerouslySetInnerHTML={{ __html: html }} />
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
