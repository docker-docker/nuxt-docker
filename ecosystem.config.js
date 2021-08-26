module.exports = {
  apps: [{
    name: 'www',
    cwd: './',
    script: './node_modules/nuxt-start/bin/nuxt-start.js',
    autorestart: true,
    watch: [
      '_nuxt',
      'dist'
    ]
  }]
}
