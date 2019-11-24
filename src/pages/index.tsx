import { Generator } from '../components/generator'
import { Layout } from '../components/layout'
import React from 'react'
import { SEO } from '../components/seo'

/**
 * Index page
 * combines Layout, SEO and Generator component
 */
const IndexPage = () => (
  <Layout>
    <SEO />
    <Generator />
  </Layout>
)

export default IndexPage
