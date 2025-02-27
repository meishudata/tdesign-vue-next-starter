// import type { MenuListResult } from '@/api/model/permissionModel';
import { request } from '@/utils/request';

const Api = {
  MenuList: '/menu',
};

export async function getMenuList() {
  const arr = await request.get<any>({
    url: Api.MenuList,
  });

  const menus = arr.map((a: any) => {
    return {
      id: a.id,
      pid: a.parentId,
      path: a.path,
      name: a.name,
      component: a.component,
      // Don't set both. if components is set, route will be error.
      // [Vue Router warn]: Record with path "/dashboard/base" is either missing a "component(s)" or "children" property.
      // components: a.components,
      redirect: a.redirect,
      meta: {
        title: a.metaTitle,
        icon: a.metaIcon,
        expanded: a.metaExpanded,
        orderNo: a.metaOrderNo,
        hidden: a.metaHidden,
        hiddenBreadcrumb: a.metaHiddenBreadcrumb,
        single: a.metaSingle,
        wrapped: a.metaWrapped,
        keepAlive: a.metaKeepAlive,
        frameSrc: a.metaFrameSrc,
        frameBlank: a.metaFrameBlank,
      },
      children: [],
    };
  });

  const list = menus
    .filter((m: any) => m.pid === 0)
    .sort()
    .map((m: any) => {
      transformMenus(m, menus);
      return m;
    });

  return list;
}

function transformMenus(curr: any, all: any) {
  const children = all.filter((f: any) => f.pid === curr.id);
  if (typeof children === 'undefined' || !children.length) return;

  children.forEach((c) => {
    transformMenus(c, all);
    curr.children.push(c);
  });

  // sort menu
  curr.children = curr.children.sort();
}
