import { dynamic } from '../utils'

/* 同步引入 */
export { default as App } from './App.js'
export { Login } from './Auth'
// 视频信息列表
export { default as VideoInfo } from './module/VideoInfo'
// 视频详细
export { default as VideoDetail } from './module/VideoDetail'
// 取票
export { default as GetTickets } from './module/GetTickets'
// 退票
export { default as ReturnTickets } from './module/ReturnTicket'
// 视频分类
export { default as VideoType } from './module/Type'
// 导入视频文件
export { default as InitFile } from './module/InitFile'

/* 异步引入 */
export const NotFound = dynamic({
    component: () => import('./Error/NotFound'),
})

export const NotAuth = dynamic({
    component: () => import('./Error/NotAuth'),
})