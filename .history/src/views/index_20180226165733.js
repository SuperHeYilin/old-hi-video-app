import { dynamic } from '../utils'

/* 同步引入 */
export { default as App } from './App.js'
export { Login } from './auth'

/* 异步引入 */
export const NotFound = dynamic({
    component: () => import('./Error/NotFound'),
})

export const NotAuth = dynamic({
    component: () => import('./Error/NotAuth'),
})