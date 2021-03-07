import createLogger from 'vuex/dist/logger'

export const persistPaths = []
export const getters = {}
export const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : []
