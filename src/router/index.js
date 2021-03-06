import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/administrator-center',
    name: 'Dashboard',
    meta: { title: '管理中心', icon: 'dashboard', affix: false },
    children: [
      {
        path: 'administrator-center',
        component: () => import('@/views/dashboard/administrator-center'),
        name: 'AdministratorCenter',
        meta: { title: '管理员中心', icon: '', affix: false }
      }, {
        path: 'administrator',
        component: () => import('@/views/dashboard/administrator'),
        name: 'Administrator',
        meta: { title: '管理员', icon: '', affix: false }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'Dashboard',
    redirect: '/product',
    meta: { title: '产品管理中心', icon: 'documentation', affix: false },
    children: [
      {
        path: 'kechengguanli',
        name: 'kechengguanli',
        component: () => import('@/views/product/index'),
        alwaysShow: true,
        redirect: 'kechengliebiao',
        meta: { title: '课程管理', icon: '', affix: false },
        children: [
          {
            path: 'kechengliebiao',
            component: () => import('@/views/product/kechengguanli/kechengliebiao'),
            name: 'kechengliebiao',
            meta: { title: '课程列表', icon: '', affix: false }
          },
          {
            path: 'kechengbianji',
            component: () => import('@/views/product/kechengguanli/kechengbianji'),
            name: 'kechengbianji',
            hidden: true,
            meta: { title: '课程编辑', icon: '', affix: false }
          },
          {
            path: 'kechengluru',
            component: () => import('@/views/product/kechengguanli/kechengluru'),
            name: 'kechengluru',
            hidden: true,
            meta: { title: '课程录入', icon: '', affix: false }
          },
          {
            path: 'keshiguanli',
            component: () => import('@/views/product/kechengguanli/keshiguanli'),
            name: 'keshiguanli',
            hidden: true,
            meta: { title: '课时编辑', icon: '', affix: false }
          },
          {
            path: 'xinzengkeshi',
            component: () => import('@/views/product/kechengguanli/xinzengkeshi'),
            name: 'xinzengkeshi',
            hidden: true,
            meta: { title: '新增课时', icon: '', affix: false }
          },
          {
            path: 'keshibianji',
            component: () => import('@/views/product/kechengguanli/keshibianji'),
            name: 'keshibianji',
            hidden: true,
            meta: { title: '课时编辑', icon: '', affix: false }
          },
          {
            path: 'xinbiaoqian',
            component: () => import('@/views/product/kechengguanli/xinbiaoqian'),
            name: 'xinbiaoqian',
            hidden: true,
            meta: { title: '新标签', icon: '', affix: false }
          }, {
            path: 'kechengrizhi',
            component: () => import('@/views/product/kechengguanli/kechengrizhi'),
            name: 'kechengrizhi',
            hidden: true,
            meta: { title: '课程日志', icon: '', affix: false }
          }
        ]
      },
      {
        path: 'dakaguanli',
        name: 'dakaguanli',
        alwaysShow: true,
        redirect: '/product/dakaguanli/dakaliebiao',
        component: () => import('@/views/product/index'),
        meta: { title: '大咖管理', icon: '', affix: false },
        children: [
          {
            path: 'dakaliebiao',
            component: () => import('@/views/product/dakaguanli/dakaliebiao'),
            name: 'dakaliebiao',
            meta: { title: '大咖列表', icon: '', affix: false }
          },
          {
            path: 'dakaluru',
            component: () => import('@/views/product/dakaguanli/dakaluru'),
            name: 'dakaluru',
            hidden: true,
            meta: { title: '大咖录入', icon: '', affix: false }
          },
          {
            path: 'dakabianji',
            component: () => import('@/views/product/dakaguanli/dakabianji'),
            name: 'dakabianji',
            hidden: true,
            meta: { title: '大咖编辑', icon: '', affix: false }
          },
          {
            path: 'dakaxiangqing',
            component: () => import('@/views/product/dakaguanli/dakaxiangqing'),
            name: 'dakaxiangqing',
            hidden: true,
            meta: { title: '大咖详情', icon: '', affix: false }
          },
          {
            path: 'tianjiahangye',
            component: () => import('@/views/product/dakaguanli/tianjiahangye'),
            name: 'tianjiahangye',
            hidden: true,
            meta: { title: '添加行业', icon: '', affix: false }
          }, {
            path: 'dakarizhi',
            component: () => import('@/views/product/dakaguanli/dakarizhi'),
            name: 'dakarizhi',
            hidden: true,
            meta: { title: '大咖日志', icon: '', affix: false }
          }
        ]
      },
      {
        path: 'wendaguanli',
        name: 'wendaguanli',
        alwaysShow: true,
        redirect: '/product/wendaguanli/wendaliebiao',
        component: () => import('@/views/product/index'),
        meta: { title: '问答管理', icon: '', affix: false },
        children: [
          {
            path: 'wendaliebiao',
            component: () => import('@/views/product/wendaguanli/wendaliebiao'),
            name: 'wendaliebiao',
            meta: { title: '问答列表', icon: '', affix: false }
          },
          {
            path: 'tiwenguanli',
            component: () => import('@/views/product/wendaguanli/tiwenguanli'),
            name: 'tiwenguanli',
            meta: { title: '提问管理', icon: '', affix: false }
          },
          {
            path: 'huidaguanli',
            component: () => import('@/views/product/wendaguanli/huidaguanli'),
            name: 'huidaguanli',
            meta: { title: '回答管理', icon: '', affix: false }
          },
          {
            path: 'wendaluru',
            component: () => import('@/views/product/wendaguanli/wendaluru'),
            name: 'wendaluru',
            hidden: true,
            meta: { title: '问答录入', icon: '', affix: false }
          },
          {
            path: 'wendarizhi',
            component: () => import('@/views/product/wendaguanli/wendarizhi'),
            name: 'wendarizhi',
            hidden: true,
            meta: { title: '问答日志', icon: '', affix: false }
          },
          {
            path: 'wanju',
            component: () => import('@/views/product/wendaguanli/wanju'),
            name: 'wanju',
            hidden: true,
            meta: { title: '婉拒', icon: '', affix: false }
          },
          {
            path: 'huidaxiangqing',
            component: () => import('@/views/product/wendaguanli/huidaxiangqing'),
            name: 'huidaxiangqing',
            hidden: true,
            meta: { title: '回答详情', icon: '', affix: false }
          }

        ]
      }
    ]
  }

]
//   {
//     path: '/documentation',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/documentation/index'),
//         name: 'Documentation',
//         meta: { title: 'Documentation', icon: 'documentation', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/guide',
//     component: Layout,
//     redirect: '/guide/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/guide/index'),
//         name: 'Guide',
//         meta: { title: 'Guide', icon: 'guide', noCache: true }
//       }
//     ]
//   },
//   {
//     path: '/profile',
//     component: Layout,
//     redirect: '/profile/index',
//     hidden: true,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/profile/index'),
//         name: 'Profile',
//         meta: { title: 'Profile', icon: 'user', noCache: true }
//       }
//     ]
//   }
// ]

// /**
//  * asyncRoutes
//  * the routes that need to be dynamically loaded based on user roles
//  */
export const asyncRoutes = []
// export const asyncRoutes = [
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/page',
//     alwaysShow: true, // will always show the root menu
//     name: 'Permission',
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'page',
//         component: () => import('@/views/permission/page'),
//         name: 'PagePermission',
//         meta: {
//           title: 'Page Permission',
//           roles: ['admin'] // or you can only set roles in sub nav
//         }
//       },
//       {
//         path: 'directive',
//         component: () => import('@/views/permission/directive'),
//         name: 'DirectivePermission',
//         meta: {
//           title: 'Directive Permission'
//           // if do not set roles, means: this page does not require permission
//         }
//       },
//       {
//         path: 'role',
//         component: () => import('@/views/permission/role'),
//         name: 'RolePermission',
//         meta: {
//           title: 'Role Permission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },

//   {
//     path: '/icon',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/icons/index'),
//         name: 'Icons',
//         meta: { title: 'Icons', icon: 'icon', noCache: true }
//       }
//     ]
//   },

//   /** when your routing map is too long, you can split it into small modules **/
//   componentsRouter,
//   chartsRouter,
//   nestedRouter,
//   tableRouter,

//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/list',
//     name: 'Example',
//     meta: {
//       title: 'Example',
//       icon: 'example'
//     },
//     children: [
//       {
//         path: 'create',
//         component: () => import('@/views/example/create'),
//         name: 'CreateArticle',
//         meta: { title: 'Create Article', icon: 'edit' }
//       },
//       {
//         path: 'edit/:id(\\d+)',
//         component: () => import('@/views/example/edit'),
//         name: 'EditArticle',
//         meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
//         hidden: true
//       },
//       {
//         path: 'list',
//         component: () => import('@/views/example/list'),
//         name: 'ArticleList',
//         meta: { title: 'Article List', icon: 'list' }
//       }
//     ]
//   },

//   {
//     path: '/tab',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/tab/index'),
//         name: 'Tab',
//         meta: { title: 'Tab', icon: 'tab' }
//       }
//     ]
//   },

//   {
//     path: '/error',
//     component: Layout,
//     redirect: 'noRedirect',
//     name: 'ErrorPages',
//     meta: {
//       title: 'Error Pages',
//       icon: '404'
//     },
//     children: [
//       {
//         path: '401',
//         component: () => import('@/views/error-page/401'),
//         name: 'Page401',
//         meta: { title: '401', noCache: true }
//       },
//       {
//         path: '404',
//         component: () => import('@/views/error-page/404'),
//         name: 'Page404',
//         meta: { title: '404', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/error-log',
//     component: Layout,
//     children: [
//       {
//         path: 'log',
//         component: () => import('@/views/error-log/index'),
//         name: 'ErrorLog',
//         meta: { title: 'Error Log', icon: 'bug' }
//       }
//     ]
//   },

//   {
//     path: '/excel',
//     component: Layout,
//     redirect: '/excel/export-excel',
//     name: 'Excel',
//     meta: {
//       title: 'Excel',
//       icon: 'excel'
//     },
//     children: [
//       {
//         path: 'export-excel',
//         component: () => import('@/views/excel/export-excel'),
//         name: 'ExportExcel',
//         meta: { title: 'Export Excel' }
//       },
//       {
//         path: 'export-selected-excel',
//         component: () => import('@/views/excel/select-excel'),
//         name: 'SelectExcel',
//         meta: { title: 'Export Selected' }
//       },
//       {
//         path: 'export-merge-header',
//         component: () => import('@/views/excel/merge-header'),
//         name: 'MergeHeader',
//         meta: { title: 'Merge Header' }
//       },
//       {
//         path: 'upload-excel',
//         component: () => import('@/views/excel/upload-excel'),
//         name: 'UploadExcel',
//         meta: { title: 'Upload Excel' }
//       }
//     ]
//   },

//   {
//     path: '/zip',
//     component: Layout,
//     redirect: '/zip/download',
//     alwaysShow: true,
//     name: 'Zip',
//     meta: { title: 'Zip', icon: 'zip' },
//     children: [
//       {
//         path: 'download',
//         component: () => import('@/views/zip/index'),
//         name: 'ExportZip',
//         meta: { title: 'Export Zip' }
//       }
//     ]
//   },

//   {
//     path: '/pdf',
//     component: Layout,
//     redirect: '/pdf/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/pdf/index'),
//         name: 'PDF',
//         meta: { title: 'PDF', icon: 'pdf' }
//       }
//     ]
//   },
//   {
//     path: '/pdf/download',
//     component: () => import('@/views/pdf/download'),
//     hidden: true
//   },

//   {
//     path: '/theme',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/theme/index'),
//         name: 'Theme',
//         meta: { title: 'Theme', icon: 'theme' }
//       }
//     ]
//   },

//   {
//     path: '/clipboard',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/clipboard/index'),
//         name: 'ClipboardDemo',
//         meta: { title: 'Clipboard', icon: 'clipboard' }
//       }
//     ]
//   },

//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://github.com/PanJiaChen/vue-element-admin',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
