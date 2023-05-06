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
      components: a.components,
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

  return menus;
}
