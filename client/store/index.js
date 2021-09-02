import createLogger from 'vuex/dist/logger'

export const persistPaths = [
  'app.loginUserInfo'
]
export const getters = {
  // global setting
  site: state => state.app.site,
  // user login info
  loginUserInfo: state => state.app.loginUserInfo
}
export const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : []
