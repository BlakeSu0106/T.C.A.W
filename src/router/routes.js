const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { path: '', component: () => import('pages/IndexPage.vue') },
    // ],
  },
  {
    name: 'SignPage',
    path: '/SignPage',
    component: () => import('src/components/SignPage.vue'),
  },
];

export default routes;
