const pkg = require('../../package.json')
// const isProduction = process.env.NODE_ENV === 'production'

const config = {
  // Common settings
  website: {
    name: pkg.name,
    desc: pkg.description,
    url: 'https://seniortesting.club'
  }
}
module.exports = config
