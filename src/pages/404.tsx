import { navigate } from 'gatsby'
import { useEffect } from 'react'

/**
 * 404 Page
 * redirects to index page
 */
const NotFoundPage = () => {
  useEffect(() => {
    navigate('/')
  }, [])

  return null
}

export default NotFoundPage
