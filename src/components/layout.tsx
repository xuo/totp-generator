/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import '../css/reset.css'
import '../css/app.css'

import React from 'react'

export const Layout = ({ children }: Layout) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

interface Layout {
  children: React.ReactNode
}
