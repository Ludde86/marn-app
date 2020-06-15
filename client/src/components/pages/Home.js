import React, { useContext, useEffect } from 'react';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList';
import AuthContext from '../../context/auth/authContext';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, isAuthenticated } = authContext;

	// validate and put user into state
	useEffect(
		() => {
			if (!isAuthenticated) {
				props.history.push('/login');
			} else {
				loadUser();
			}
			// eslint-disable-next-line
		},
		[ isAuthenticated, props.history ]
	);

	return (
		<div className="todo-container">
			<TodoForm />
			<TodoList />
		</div>
	);
};

export default Home;
