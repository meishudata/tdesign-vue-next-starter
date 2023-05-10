import { defineStore } from 'pinia';

import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';
import { request } from '@/utils/request';

const InitUserInfo = {
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || '', // 默认token不走权限
    userInfo: { ...InitUserInfo },
    usr: {} as any,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const { phone, code } = userInfo;
      const res = await request.post({ url: '/usr/signin', data: { phone, code } });
      this.usr = res;
      if (res.accessToken) {
        this.token = decodeURIComponent(res.accessToken);
        localStorage.setItem(TOKEN_NAME, this.token);
      } else {
        throw res;
      }
    },
    async getUserInfo() {
      this.userInfo = this.usr || {};
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
    async removeToken() {
      this.token = '';
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
