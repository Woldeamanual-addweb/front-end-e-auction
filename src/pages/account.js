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
