import { dynamic } from '../utils'

/* 同步引入 */
export { default as App } from './App.js'
export { Login } from './auth'

/* 异步引入 */
export const User = dynamic({
    component: () => import('./platform/User'),
})

export const Authority = dynamic({
    component: () => import('./platform/Authority'),
})

export const RopWechatAccount = dynamic({
    component: () => import('./rop/Wechat'),
})

export const RopAlipayAccount = dynamic({
    component: () => import('./rop/Alipay'),
})

export const AppCenter = dynamic({
    component: () => import('./platform/AppCenter'),
})

export const NotFound = dynamic({
    component: () => import('./Error/NotFound'),
})

export const NotAuth = dynamic({
    component: () => import('./Error/NotAuth'),
})