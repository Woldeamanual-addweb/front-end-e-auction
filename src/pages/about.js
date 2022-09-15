import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"

export default function about({ data }) {
  const aboutUs = data.allNodeAboutUs.edges[0].node.body.processed
  return (
    <Layout>
      <div>{aboutUs}</div>
    </Layout>
  )
}

export const query = graphql`
  query AboutUs {
    allNodeAboutUs {
      edges {
        node {
          id
          title
          body {
            processed
          }
        }
      }
    }
  }
`
