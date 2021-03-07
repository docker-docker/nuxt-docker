module.exports = {
  apps: [{
    name: 'cvr',
    cwd: './',
    script: './node_modules/nuxt-start/bin/nuxt-start.js',
    watch: [
      'dist',
      '.dist',
      '_nuxt'
    ]
  }]
}
