const config = require('./src/config')
// const server = require('./server')
// const serverConfig = require('./server/api/config')
const now = new Date()
module.exports = {
  // mode: 'spa',
  mode: 'universal',
  /**
   * common settings
   */
  buildDir: '.dist',
  srcDir: 'src/',
  env: {
    BUILD_VERSION: now.getFullYear() + (now.getMonth() + 1) + now.getDate()
  },
  head: {
    title: config.website.name + ',' + config.website.desc,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: config.website.keyword || '' },
      { hid: 'description', name: 'description', content: config.website.desc || '' }
    ],
    link: [
      // favicon generator:
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
      // { rel: 'manifest', href: '/site.webmanifest' }
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css' },
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' },
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' }
    ],
    script: [
      // format: {src: '', defer:true}
    ]
  },
  /*
    ** loading bar
    */
  loading: { color: '#409eff', height: '5px' },
  // Only for SPA loading bar
  loadingIndicator: {
    name: '~/static/loading.html',
    color: '#3B8070',
    background: 'white'
  },
  css: [
    'normalize.css',
    '~/assets/css/app.scss'
  ],
  plugins: [
    { src: '~/plugins/nuxt-axios', ssr: false },
    { src: '~/plugins/element-ui', ssr: false }
  ],
  router: {
    middleware: [],
    extendRoutes (routes, resolve) {
      // const profileIndex = routes.findIndex(route => route.name === 'profile')
      // routes[profileIndex] = {
      //   ...routes[profileIndex],
      //   components: {
      //     default: routes[profileIndex].component,
      //     notification: resolve(__dirname, 'components/mainTop.vue')
      //   },
      //   chunkNames: {
      //     top: 'components/mainTop'
      //   }
      // }
    }
  },
  modules: [
    ['@nuxtjs/axios', {
      progress: true,
      retry: false,
      credentials: true
    }],
    ['@nuxtjs/device'],
    ['@nuxtjs/sitemap', {
      hostname: config.website.url,
      path: 'sitemap_index.xml',
      gzip: false,
      exclude: [
        '/admin/**'
      ]
    }],
    ['@nuxtjs/robots', [
      {
        UserAgent: '*'
        // Disallow: serverConfig.prefix
      }
    ]]
  ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  build: {
    // CDN config: https://nuxtjs.org/api/configuration-build/#publicpath
    // publicPath: config.serverUrls.CDN_BASE_URL,
    extractCSS: true,
    // analysis package size
    analyze: {
      analyzerMode: process.env.NODE_ENV === 'development' ? 'static' : 'disabled'
    },
    // vendor size
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'dist',
        maxSize: 256000
      }
    },
    babel: {
      presets: ['@nuxt/babel-preset-app'],
      comments: true,
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    // 默认babel不会编译node-modules目录的文件,对于一些包采用源码形式打包的将不被转译
    transpile: [
      // element-ui
      /^element-ui/
    ],
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = 'source-map'
        /*
                 ** Run ESLINT on save
                */
        if (ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      }
    }
  },
  // 服务端渲染组件
  serverMiddleware: [
    // { path: serverConfig.prefix, handler: server }
  ]
}
