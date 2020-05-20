import React from 'react';
import TodoForm from '../todo/TodoForm';
import TodoList from '../todo/TodoList';

const Home = () => {
	return (
		<div className="todo-container">
			<TodoForm />
			<TodoList />
		</div>
	);
};

export default Home;
