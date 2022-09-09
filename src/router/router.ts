import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dialog'
    },
    {
        path: '/dialog',
        name: 'dialog',
        component: () => import('@/views/Dialog/Dialog.vue')
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router