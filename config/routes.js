export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                name: 'welcome',
                path: '/welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                name: 'resume.create',
                path: '/resume/create',
                icon: 'smile',
                component: './Resume/create'
              },
              {
                name: 'resume.get-updata',
                path: '/resume/get-updata',
                icon: 'smile',
                component: './Resume/get-updata'
              },
              // {
              //   name: 'user.get-list',
              //   path: '/userlist',
              //   icon: 'smile',
              //   component: './UserList'
              // },
              {
                name: 'upload',
                path: '/upload',
                icon: 'smile',
                component: './UploadImage'
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
