import React, { useContext, useEffect } from 'react';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList';
import AuthContext from '../../context/auth/authContext';

const Todo = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, isAuthenticated, colorWhite, colorBlue, colorPink } = authContext;

	// validate and put user into state
	useEffect(
		() => {
			if (!isAuthenticated) {
				props.history.push('/login');
			} else {
				loadUser();
			}
		},
		// eslint-disable-next-line
		[ isAuthenticated, props.history ]
	);

	return (
		<div>
			{colorWhite && (
				<div className="todo-container__white">
					{/*<h3 className="shopping-title">Att Handla</h3>*/}
					<TodoForm />
					<TodoList />
				</div>
			)}
			{colorBlue && (
				<div className="todo-container__blue">
					{/*<h3 className="shopping-title">Att Handla</h3>*/}
					<TodoForm />
					<TodoList />
				</div>
			)}
			{colorPink && (
				<div className="todo-container__pink">
					{/*<h3 className="shopping-title">Att Handla</h3>*/}
					<TodoForm />
					<TodoList />
				</div>
			)}
		</div>
	);
};

export default Todo;
