import { Generator } from '../components/generator'
import { Layout } from '../components/layout'
import React from 'react'
import { SEO } from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO />
    <Generator />
  </Layout>
)

export default IndexPage
