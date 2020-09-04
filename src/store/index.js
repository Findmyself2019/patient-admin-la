import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import getters from "./getters";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user
  },
  getters,
  state: {
    sideBar: false, //控制侧边栏显示隐藏
    isOrganization: false, //是否为其他机构
    otherOrgInfo: {},
    selfOrgInfo: {},
    clickName: "", //当前点击的侧边栏选项
    path: "",
    personDetail: {},
    activeSideTitle: "",
    licData: {},
    registerOrgId: ""
  },
  mutations: {
    TOGGLESIDEBAR(state) {
      state.sideBar = !state.sideBar;
    },
    SETOTHERORGINFO(state, data) {
      state.otherOrgInfo = data;
    },
    SETSELFORGINFO(state, data) {
      state.selfOrgInfo = data;
    },
    SETISORGANIZATION(state, data) {
      state.isOrganization = data;
    },
    EDITCLICKNAME(state, data) {
      state.clickName = data;
    },
    SETPATH(state, data) {
      state.path = data;
    },
    SETPERSONDETAIL(state, data) {
      state.personDetail = data;
    },
    SHOWSIDEACTIVE(state, name) {
      state.activeSideTitle = name;
    },
    GETLICDETAIL(state, name) {
      state.licData = name;
    },
    GETREGISTERID(state, id) {
      state.registerOrgId = id;
    }
  },
  actions: {
    toggleSideBar({ commit }, data) {
      commit("TOGGLESIDEBAR", data);
    },
    setOtherOrgInfo({ commit }, data) {
      commit("SETOTHERORGINFO", data);
    },
    setSelfOrgInfo({ commit }, data) {
      commit("SETSELFORGINFO", data);
    },
    setIsOrganization({ commit }, data) {
      commit("SETISORGANIZATION", data);
    },
    editClickName({ commit }, data) {
      commit("EDITCLICKNAME", data);
    },
    setpath({ commit }, path) {
      commit("SETPATH", path);
    },
    setPersonDetail({ commit }, data) {
      commit("SETPERSONDETAIL", data);
    },
    showSideActive({ commit }, name) {
      commit("SHOWSIDEACTIVE", name);
    },
    getLicDetail({ commit }, info) {
      commit("GETLICDETAIL", info);
    },
    getRegisterId({ commit }, info) {
      commit("GETREGISTERID", info);
    }
  }
});
