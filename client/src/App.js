import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostState from './context/post/PostState';
import TodoState from './context/todo/TodoState';
import ShoppingState from './context/shopping/ShoppingState';

import './App.css';
import './components/shopping/Shopping.css';
import './components/post/Post.css';
import './components/todo/Todo.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Start from './components/pages/Start';
import Shopping from './components/pages/Shopping';
import AuthState from './context/auth/AuthState';

const App = () => {
	return (
		<Router>
			<div className="navbar-container">
				<Navbar />
			</div>
			<div className="app-container">
				<AuthState>
					<TodoState>
						<PostState>
							<ShoppingState>
								<Switch>
									<Route exact path="/" component={Start} />
									<Route exact path="/home" component={Home} />
									<Route exact path="/shopping" component={Shopping} />
								</Switch>
							</ShoppingState>
						</PostState>
					</TodoState>
				</AuthState>
			</div>
		</Router>
	);
};

export default App;
