import { graphql, useStaticQuery } from 'gatsby'

import Helmet from 'react-helmet'
import React from 'react'

/**
 * SEO component
 * updates SEO related metadata via React Helmet
 */
export function SEO({ title = '', description = '', lang = 'en' }: Props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={site.siteMetadata.title}
      meta={[
        { name: `description`, content: metaDescription },
        { property: `og:title`, content: title },
        { property: `og:description`, content: metaDescription },
        { property: `og:type`, content: `website` },
        { name: `twitter:card`, content: `summary` },
        { name: `twitter:title`, content: title },
        { name: `twitter:description`, content: metaDescription }
      ]}
    />
  )
}

interface Props {
  title?: string
  description?: string
  lang?: string
}
