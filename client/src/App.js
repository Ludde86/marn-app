import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostState from './context/post/PostState';
import TodoState from './context/todo/TodoState';
import ShoppingState from './context/shopping/ShoppingState';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import './components/shopping/Shopping.css';
import './components/post/Post.css';
import './components/todo/Todo.css';

import Navbar from './components/layout/Navbar';
import Todo from './components/pages/Todo';
import Start from './components/pages/Start';
import Shopping from './components/pages/Shopping';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import setAuthToken from './utils/setAuthToken';
import LoggedInUser from './components/layout/LoggedInUser';

// we want to load the token each time we run our application
if (sessionStorage.token) {
	setAuthToken(sessionStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<Router>
				<div className="app-container">
					<TodoState>
						<PostState>
							<ShoppingState>
								<LoggedInUser />
								<Navbar />
								<Switch>
									<Route exact path="/" component={Start} />
									<PrivateRoute exact path="/todo" component={Todo} />
									<PrivateRoute exact path="/shopping" component={Shopping} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
								</Switch>
							</ShoppingState>
						</PostState>
					</TodoState>
				</div>
			</Router>
		</AuthState>
	);
};

export default App;
