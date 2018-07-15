import { dynamic } from '../utils'

/* 同步引入 */
export { default as App } from './App.js'
export { Login } from './auth'
export { default as Quartz } from './module/Quartz'
// export { default as TenantInfo } from './module/Appcenter'
export { default as UserCenter } from './module/UserCenter'
export { default as Ticket } from './module/TicketManage/Ticket'
// 票务订单
export { default as TicketOrder } from './module/TicketOrder'
// 创建产品类型
export { default as CreateTicket } from './module/TicketManage/CreateTicket'
// 产品列表
export { default as ProductList } from './module/TicketManage/TicketProduct'
// 创建产品
export { default as CreateProduct } from './module/TicketManage/Product'
export { default as ConfigDistributor } from './module/TicketManage/Product/Distributor'
// 订单
export { default as OrderQuery } from './module/Order/Query'
export { default as OrderReservation } from './module/Order/Reservation'
export { default as OrderChargeBack } from './module/Order/Chargeback'
// 合作伙伴
export { default as Distributor } from './module/Partner/Distributor'
export { default as CreateDistributor } from './module/Partner/CreateDistributor'
export { default as Supplier } from './module/Partner/Supplier'
// 合作模式
export { default as Cooperation } from './module/Partner/Cooperation'
// 统计
export { default as Sales } from './module/Statistics/Sales'
// 商户
export { default as BaseInfo } from './module/Scenic/BaseInfo'
export { default as Authentication } from './module/Scenic/Authentication'
// 案例
export { default as DemoUi } from './demo/Ui'


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