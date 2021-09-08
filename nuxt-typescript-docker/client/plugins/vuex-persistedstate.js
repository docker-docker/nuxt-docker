import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import cfg from '@/config'
import { persistPaths } from '@/store'

const ls = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: cfg.store.secretKey
})
export default ({ store }) => {
  // window.onNuxtReady(() => {
  if (cfg.store.secretEnabled) {
    createPersistedState({
      key: cfg.store.key,
      paths: persistPaths,
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })(store)
  } else {
    createPersistedState({
      key: cfg.store.key,
      // 设置缓存哪些state数据
      paths: persistPaths
    })(store)
  }
  // })
}
