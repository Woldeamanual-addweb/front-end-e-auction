import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"

export default function account({ data }) {
  console.log(data)
  return (
    <Layout>
      <div>{localStorage.getItem("username")}</div>
    </Layout>
  )
}

export const accountInfo = graphql`
  query ($UserName: String!) {
    userUser(display_name: { eq: $UserName }) {
      relationships {
        node__auctions {
          title
        }
      }
      display_name
    }
  }
`
