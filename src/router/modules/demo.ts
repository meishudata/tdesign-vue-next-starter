// import { LogoutIcon } from 'tdesign-icons-vue-next';
// import { shallowRef } from 'vue';

// import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/list',
    name: 'list',
    component: 'LAYOUT',
    redirect: '/list/base',
    meta: {
      title: '列表页',
      icon: 'view-list',
    },
    children: [
      {
        path: 'base',
        name: 'ListBase',
        component: '/list/base/index',
        meta: {
          title: '基础列表页',
        },
      },
      {
        path: 'card',
        name: 'ListCard',
        component: '/list/card/index',
        meta: {
          title: '卡片列表页',
        },
      },
      {
        path: 'filter',
        name: 'ListFilter',
        component: '/list/filter/index',
        meta: {
          title: '筛选列表页',
        },
      },
      {
        path: 'tree',
        name: 'ListTree',
        component: '/list/tree/index',
        meta: {
          title: '树状筛选列表页',
        },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    component: 'LAYOUT',
    redirect: '/form/base',
    meta: {
      title: '表单页',
      icon: 'edit-1',
    },
    children: [
      {
        path: 'base',
        name: 'FormBase',
        component: '/form/base/index',
        meta: {
          title: '基础表单页',
        },
      },
      {
        path: 'step',
        name: 'FormStep',
        component: '/form/step/index',
        meta: {
          title: '分步表单页',
        },
      },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    component: 'LAYOUT',
    redirect: '/detail/base',
    meta: {
      title: '详情页',
      icon: 'layers',
    },
    children: [
      {
        path: 'base',
        name: 'DetailBase',
        component: '/detail/base/index',
        meta: {
          title: '基础详情页',
        },
      },
      {
        path: 'advanced',
        name: 'DetailAdvanced',
        component: '/detail/advanced/index',
        meta: {
          title: '多卡片详情页',
        },
      },
      {
        path: 'deploy',
        name: 'DetailDeploy',
        component: '/detail/deploy/index',
        meta: {
          title: '数据详情页',
        },
      },
      {
        path: 'secondary',
        name: 'DetailSecondary',
        component: '/detail/secondary/index',
        meta: {
          title: '二级详情页',
        },
      },
    ],
  },
  {
    path: '/frame',
    name: 'Frame',
    component: 'Layout',
    redirect: '/frame/doc',
    meta: {
      icon: 'internet',
      title: '外部页面',
    },
    children: [
      {
        path: 'doc',
        name: 'Doc',
        component: 'IFrame',
        meta: {
          frameSrc: 'https://tdesign.tencent.com/starter/docs/vue-next/get-started',
          title: '使用文档（内嵌）',
        },
      },
      {
        path: 'TDesign',
        name: 'TDesign',
        component: 'IFrame',
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          title: 'TDesign 文档（内嵌）',
        },
      },
      {
        path: 'TDesign2',
        name: 'TDesign2',
        component: 'IFrame',
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          frameBlank: true,
          title: 'TDesign 文档（外链）',
        },
      },
    ],
  },
];
