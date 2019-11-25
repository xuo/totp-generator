import '../css/reset.css'
import '../css/app.css'

import React from 'react'

/**
 * Layout wrapper component
 */
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>
}
