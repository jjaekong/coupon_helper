import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

    const routes = [
    {
        path: '/',
        name: 'usage-guide',
        component: () => import('../views/UsageGuide.vue')
    },
    {
        path: '/usage_guide',
        name: 'usage-guide',
        component: () => import('../views/UsageGuide.vue'),
    },
    {
        path: '/usage_guide/new',
        name: 'usage-guide-new',
        component: () => import('../views/UsageGuideNew.vue'),
    },
    {
        path: '/usage_guide/list',
        name: 'usage-guide-list',
        component: () => import('../views/UsageGuideList.vue'),
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
