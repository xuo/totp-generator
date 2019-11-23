/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import './reset.css'
import './app.css'

import React from 'react'

const Layout = ({ children }: Layout) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

interface Layout {
  children: React.ReactNode
}

export default Layout
