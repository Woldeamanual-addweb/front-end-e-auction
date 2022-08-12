import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout"
import { portfolio, projects } from "../../styles/projects.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Auctions({ data }) {
  console.log(data)
  const projectss = data.projects.nodes
  const contact = data.contact.siteMetadata.contact

  return (
    <Layout>
      <div className={portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I have created</h3>
        <div className={projects}>
          {projectss.map(project => (
            <Link to={"/projects/" + project.frontmatter.slug}>
              {" "}
              <div>
                <GatsbyImage
                  image={
                    project.frontmatter.thumb.childImageSharp.gatsbyImageData
                  }
                />

                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
        <p>Like what you see ? Email me {contact} for a quote !</p>
      </div>
    </Layout>
  )
}
// export page query

export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      nodes {
        id
        frontmatter {
          title
          stack
          slug
          thumb {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`
