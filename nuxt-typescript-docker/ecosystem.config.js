module.exports = {
  apps: [{
    name: 'www',
    // exec_mode: 'cluster',
    instances: 'max',
    autorestart: true,
    max_restarts: 3,
    restart_delay: 5000,
    error_file: '/www/logs/pm2err.log',
    out_file: '/www/logs/pm2out.log',
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start',
    // enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded
    watch: [
      'src'
    ]
  }]
}
