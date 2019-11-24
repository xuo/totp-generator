import '../css/reset.css'
import '../css/app.css'

import React from 'react'

/**
 * Layout wrapper component
 */
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
