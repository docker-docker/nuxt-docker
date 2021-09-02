import cfg from './client/config'
export default {
  ssr: true,
  srcDir: 'client/',
  head: {
    title: cfg.site.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,  initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=0'
      },
      {
        name: 'keywords',
        content: cfg.site.keywords
      },
      {
        hid: 'description',
        name: 'description',
        content: cfg.site.description || process.env.npm_package_description
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
    ** loading bar
    */
  loading: {
    color: '#409eff',
    height: '5px'
  },
  // loading
  loadingIndicator: {
    name: '@/static/loading.html',
    color: '#3B8070',
    background: 'white'
  },
  css: [
    'normalize.css',
    '~/assets/css/app.scss'
  ],
  plugins: [
    {
      src: '@/plugins/vuex-persistedstate',
      ssr: false
    },
    {
      src: '@/plugins/axios',
      ssr: false
    },
    {
      src: '@/plugins/element-ui',
      ssr: false
    }
  ],
  modules: [
    ['@nuxtjs/axios', {
      progress: true,
      retry: false,
      credentials: true,
      timeout: cfg.http.timeout
    }],
    ['@nuxtjs/sitemap', {
      path: 'sitemap_index.xml',
      gzip: false,
      exclude: []
    }]
  ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  build: {},
  serverMiddleware: [
    {
      path: require('./server/config').apiPrefix,
      handler: require('./server')
    }
  ]
}
