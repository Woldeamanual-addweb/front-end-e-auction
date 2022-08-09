import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout"
import { portfolio, projects } from "../../styles/projects.module.css"
export default function Projects({ data }) {
  const projectss = data.allMarkdownRemark.nodes

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
                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
// export page query

export const query = graphql`
  query ProjectsPage {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
      nodes {
        id
        frontmatter {
          title
          stack
          slug
        }
      }
    }
  }
`
