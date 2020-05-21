import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
    const routes = [
    {
        path: '/',
        redirect: '/guide'
    },
    {
        path: '/guide',
        name: 'guide',
        component: () => import('../views/Guide.vue'),
    },
    {
        path: '/guide/new',
        name: 'guide-new',
        component: () => import('../views/GuideNew.vue'),
    },
    {
        path: '/guide/list',
        name: 'guide-list',
        component: () => import('../views/GuideList.vue'),
    },
    {
        path: '/guide/:id',
        name: 'guide-edit',
        component: () => import('../views/GuideEdit.vue'),
    },
    {
        path: '/thumbnail',
        name: 'thumbnail',
        component: () => import('../views/Thumbnail.vue')
    },

//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
//   mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
