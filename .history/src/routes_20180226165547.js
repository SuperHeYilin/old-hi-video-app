import React from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import AuthRoute from './views/AuthRoute'

import {
  App,
} from './views'
const Routers = ({ hirstory }) => {
	return (
		<HashRouter hirstory={history}>
			<Switch>
				<Route path="/auth/login" component={Login} />
				<Route path="/" render={(props) => {
					return (
						<App {...props}>
							<Switch>
								<Route path="/" exact component={Ticket} />

								{/* platform平台核心功能模块 */}
								<AuthRoute path="/platform/user" component={User} />
								<AuthRoute path="/platform/authority" component={Authority} />
								<AuthRoute path="/platform/appcenter" component={AppCenter} />

                {/* module模块功能 */}
                <AuthRoute path="/module/ticket/order" component={TicketOrder} />
								<AuthRoute path="/module/quartz" component={Quartz} />
								<AuthRoute path="/module/ticket/index" component={Ticket} />
								<AuthRoute path="/module/ticket/create" component={CreateTicket} />
								<AuthRoute path="/module/ticket/product" component={ProductList} />
								<AuthRoute path="/module/ticket/createproduct" component={CreateProduct} />
								<AuthRoute path="/module/ticket/reviseproduct/:id" component={CreateProduct} />
								<AuthRoute path="/module/distributor/:id" component={ConfigDistributor} />
								<AuthRoute path="/module/sales" component={Sales} />
								<AuthRoute path="/module/tenant" exact component={BaseInfo} />
								<AuthRoute path="/module/tenant/authentication" component={Authentication} />
								<AuthRoute path="/module/partner/distributor" component={Distributor} />
								<AuthRoute path="/module/partner/create" component={CreateDistributor} />
								<AuthRoute path="/module/partner/supplier" component={Supplier} />
								<AuthRoute path="/module/partner/cooperation/:id" component={Cooperation} />

								{/* rop开发平台功能模块 */}
								<AuthRoute path="/rop/alipayaccount" component={RopAlipayAccount} />
								<AuthRoute path="/rop/wechataccount" component={RopWechatAccount} />

								{/* 组件功能案例 */}
								<Route path="/demo/ui" component={DemoUi} />
								<Route path="/notauth" component={NotAuth} />
								<Route path="*" component={NotFound} />
							</Switch>
						</App>
					)
				}}
				/>
				<Route path="*" component={NotFound} />
			</Switch>
		</HashRouter>
	)
}

export default (
	Routers
)