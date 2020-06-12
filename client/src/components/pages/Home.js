import React, { useContext, useEffect } from 'react';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { loadUser } = authContext;

	// validate and put user into state
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="todo-container">
			<TodoForm />
			<TodoList />
		</div>
	);
};

export default Home;
