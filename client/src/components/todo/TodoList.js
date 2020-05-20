import React, { useEffect, useContext } from 'react';
import TodoItem from './TodoItem';
import TodoContext from '../../context/todo/todoContext';

const TodoList = () => {
	const todoContext = useContext(TodoContext);

	const { todos, getDataFromDb, intervalIsSet, setIntervalIsSet } = todoContext;

	useEffect(
		() => {
			getDataFromDb();
			if (!intervalIsSet) {
				let interval = setInterval(getDataFromDb, 1000);
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
					<div className="todo-item-container" key={todo.id}>
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
