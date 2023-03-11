import { nextTick } from 'vue';
import { defineStore } from 'pinia';
import router, { constantRoutes } from '@/router';
export const useBasicStore = defineStore('basic', {
  state: () => {
    return {
      //user info
      token: '',
      getUserInfo: false,
      userInfo: { username: '', avatar: '' },
      //router
      allRoutes: [],
      roles: [],
      codes: [],
      //keep-alive
      cachedViews: [],
      cachedViewsDeep: [],
      //other
      sidebar: { opened: true },
    };
  },
  persist: {
    storage: localStorage,
    paths: ['token'],
  },
  actions: {
    setToken(data) {
      this.token = data;
    },
    setRoutes() {
      this.$patch((state) => {
        state.allRoutes = constantRoutes;
      });
    },
    setUserInfo({ userInfo }) {
      const { username, avatar } = userInfo;
      this.$patch((state) => {
        state.getUserInfo = true;
        state.userInfo.username = username;
        state.userInfo.avatar = avatar;
      });
    },
    resetState() {
      this.$patch((state) => {
        state.token = '';
        state.allRoutes = [];
        state.userInfo.username = '';
        state.userInfo.avatar = '';
      });
      this.getUserInfo = false;
    },
    resetStateAndToLogin() {
      this.resetState();
      nextTick(() => {
        router.push({ path: '/login' });
      });
    },
    setSidebarOpen(data) {
      this.$patch((state) => {
        state.sidebar.opened = data;
      });
    },
    setToggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened;
      });
    },

    /*keepAlive缓存*/
    addCachedView(view) {
      this.$patch((state) => {
        if (state.cachedViews.includes(view)) return;
        state.cachedViews.push(view);
      });
    },

    delCachedView(view) {
      this.$patch((state) => {
        const index = state.cachedViews.indexOf(view);
        index > -1 && state.cachedViews.splice(index, 1);
      });
    },
    /*third  keepAlive*/
    addCachedViewDeep(view) {
      this.$patch((state) => {
        if (state.cachedViewsDeep.includes(view)) return;
        state.cachedViewsDeep.push(view);
      });
    },
    delCacheViewDeep(view) {
      this.$patch((state) => {
        const index = state.cachedViewsDeep.indexOf(view);
        index > -1 && state.cachedViewsDeep.splice(index, 1);
      });
    },
  },
});
