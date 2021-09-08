module.exports = {
  apps: [{
    name: 'www',
    cwd: './',
    script: './node_modules/nuxt-start/bin/nuxt-start.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: [
      '_nuxt',
      'dist'
    ]
  }]
}
