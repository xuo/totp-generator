module.exports = {
  siteMetadata: {
    title: `TOTP Generator`,
    description: `A simple browser-based TOTP app`
  },
  plugins: [
    'gatsby-plugin-typescript',
    { resolve: `gatsby-plugin-favicon`, options: { logo: './src/favicon.png' } }
  ]
}
