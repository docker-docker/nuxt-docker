export const state = () => ({
  // add states here
  loginUserInfo: {}
})

export const mutations = {
  // user info
  STORE_LOGIN_USERINFO: (state, loginUserInfo) => {
    state.loginUserInfo = loginUserInfo
  },
  UPDATE_USER_INFO: (state, userInfo) => {
    state.loginUserInfo = Object.assign(state.loginUserInfo, userInfo)
  },
  REMOVE_LOGIN_USERINFO: (state) => {
    state.loginUserInfo = {}
  }
}
export const actions = {
  storeLoginUserInfo ({ commit }, loginUserInfo) {
    return new Promise((resolve, reject) => {
      commit('STORE_LOGIN_USERINFO', loginUserInfo)
      resolve(loginUserInfo)
    })
  },
  updateUserInfo ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_USER_INFO', userInfo)
      resolve(userInfo)
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_LOGIN_USERINFO')
      resolve()
    })
  }
}
