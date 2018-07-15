import React from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import AuthRoute from './views/AuthRoute'

import {
  App,
  Login,
  NotAuth,
  NotFound,
  VideoInfo,
  GetTickets,
	ReturnTickets,
	InitFile,
	VideoType,
	VideoDetail,
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
								<Route path="/module/video/info" component={VideoInfo} />
								<Route path="/module/video/detail/:id" component={VideoDetail} />
								<Route path="/module/get/ticket" component={GetTickets} />
								<Route path="/module/return/ticket" component={ReturnTickets} />
								<Route path="/module/file/init" component={InitFile} />
								<Route path="/module/video/type" component={VideoType} />
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