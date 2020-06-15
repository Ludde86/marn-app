import React, { useEffect, useContext } from 'react';
import TodoItem from './TodoItem';
import TodoContext from '../../context/todo/todoContext';

const TodoList = () => {
	const todoContext = useContext(TodoContext);

	const { todos, getTodos, intervalIsSet, setIntervalIsSet } = todoContext;

	useEffect(
		() => {
			getTodos();
			if (!intervalIsSet) {
				let interval = setInterval(getTodos, 1000);
				setIntervalIsSet(interval);
			}
		},
		// eslint-disable-next-line
		[ intervalIsSet ]
	);

	return (
		<div className="todo-list-container">
			{todos.map((todo) => {
				return (
					<div className="todo-item-container" key={todo._id}>
						{todos.length <= 0 ? (
							'NO DB ENTRIES YET'
						) : (
							<ul>
								<TodoItem todo={todo} />
							</ul>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default TodoList;
