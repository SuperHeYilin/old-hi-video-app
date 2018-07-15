import React from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import AuthRoute from './views/AuthRoute'

import {
  App,
  Login,
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