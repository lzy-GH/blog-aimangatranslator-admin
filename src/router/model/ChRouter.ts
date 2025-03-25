const router = [
    {
        title:'漫画内页管理',
        path: "/manga",
        name: 'manga',
        component:() => import('@/views/manga.vue'),
    },
    {
        title:'漫画内页管理(正式线)',
        path: "/mangaProd",
        name: 'mangaProd',
        component:() => import('@/views/mangaProd.vue'),
    }
]
export default router