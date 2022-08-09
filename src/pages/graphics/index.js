import React from "react"
import Layout from "../../components/Layout"
import { graphics } from "../../styles/graphics.module.css"
export default function index() {
  return (
    <Layout>
      <div className={graphics}>
        <h2>Graphics</h2>
        <h3>Arts I have created</h3>
      </div>
    </Layout>
  )
}
