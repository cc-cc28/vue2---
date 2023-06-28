/*
 * @Author: chizhigao户名 2279648073@qq.com邮箱
 * @Date: 2023-06-19 13:39:36
 * @LastEditors: chizhigao户名 2279648073@qq.com邮箱
 * @LastEditTime: 2023-06-19 16:55:22
 * @FilePath: \theory\theory-ui\src\router\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 在主框架内显示
 */
const meta = {
    auth: true
};

const frameIn = [{
        path: '/',
        component: {
            render: (e) => e("router-view") //空组件
        },
        children: [
            {
                path: '/',
                name: 'theory',
                component: () => import("@/views/theory/index.vue"),
                meta: {
                    ...meta,
                    title: '首页1',
                }
            },
            {
                path: '/authentication',
                name: 'authentication',
                component: () => import("@/views/authentication/index.vue"),
                meta: {
                    ...meta,
                    title: '首页2',
                }
            },
            {
                path: '/exam',
                name: 'exam',
                component: () => import("@/views/exam/index.vue"),
                meta: {
                    ...meta,
                    title: '首页3',
                }
            },
        ]
    },

];




/**
 * 错误页面
 */

const errorPage = [{
    path: '*',
    name: '404',
    meta: {
        title: '404'
    },
    component: () => import('@/views/error/404/index.vue')
}, ];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [
    ...frameIn,
    ...errorPage
];