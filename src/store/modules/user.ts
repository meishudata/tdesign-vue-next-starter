import { defineStore } from 'pinia';

import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';
import { request } from '@/utils/request';

const InitUserInfo: UserInfo = {
  name: '', // 用户名，用于展示在页面右上角头像处
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

export const useUserStore = defineStore('user', {
  state: () => ({
    [TOKEN_NAME]: '', // 默认token不走权限
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
      this.removeToken();
      this.userInfo = { ...InitUserInfo };
    },
    async removeToken() {
      this.setToken('');
    },
    async setToken(token: string) {
      this[TOKEN_NAME] = token;
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
    key: 'user',
    paths: [TOKEN_NAME],
  },
});

export function getUserStore() {
  return useUserStore(store);
}
