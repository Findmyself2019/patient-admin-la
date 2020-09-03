import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/util/user-token'
import router from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissions:[],
  organizationId:'',
  cityCode:'',
  administrativeDivisionCode:'',
  addressCountyName:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_ORGANIZATIONID:(state,organizationId)=>{
    state.organizationId = organizationId
  },
  SET_CITYROLE(state,cityCode){
    state.cityCode = cityCode
  },
  setDivisionCode(state,divisionCode){
    state.administrativeDivisionCode = divisionCode
  },
  setAddressCountyName(state,addressCountyName){
    state.addressCountyName = addressCountyName
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const username = userInfo.username.trim()
    const password = userInfo.password
    const code = userInfo.code
    const uuid = userInfo.uuid
    return new Promise((resolve, reject) => {
      login({username, password, code, uuid}).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit}) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const user = res.user
        const avatar = user.avatar == "" ? require("@/assets/img/img.jpg") : process.env.VUE_APP_BASE_API + user.avatar
        if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', res.roles)
          commit('SET_PERMISSIONS', res.permissions)
        } else {
          commit('SET_ROLES', ['ROLE_DEFAULT'])
        }
        commit('setAddressCountyName',user.divisionName)
        commit('setDivisionCode',user.administrativeDivisionCode)
        commit('SET_NAME', user.nickName)
        commit('SET_AVATAR', avatar)
        commit('SET_ORGANIZATIONID',res.user.organizationId)
        commit('SET_CITYROLE',user.roles[0].roleId)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    // resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },
  setOrganizationId({commit},id){
    commit('SET_ORGANIZATIONID',id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
