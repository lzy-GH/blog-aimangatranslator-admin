const router = [
    {
        title:'用户管理',
        path: "/user",
        name: 'user',
        component:() => import('@/views/user/index.vue'),
        children:[
            {
                title:'用户管理',
                path: "/userList",
                name: 'userList',
                component:() => import('@/views/user/userList.vue'),
            },
            {
                title:'订单管理',
                path: "/order",
                name: 'order',
                component:() => import('@/views/user/order.vue'),
            },
            {
                title:'订阅管理',
                path: "/subscribe",
                name: 'subscribe',
                component:() => import('@/views/user/subscribe.vue'),
            },
            // {
            //     title:'支付管理',
            //     path: "/pay",
            //     name: 'pay',
            //     component:() => import('@/views/user/pay.vue'),
            // },
        ]
    },
    // {
    //     title:'漫画内页管理(正式线)',
    //     path: "/mangaProd",
    //     name: 'mangaProd',
    //     component:() => import('@/views/mangaProd.vue'),
    // }
]
export default router