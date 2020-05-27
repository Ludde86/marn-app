import React, { useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const TodoItem = ({ todo }) => {
	const todoContext = useContext(TodoContext);
	const { deleteFromDB, setObjectToUpdate } = todoContext;
	return (
		<li>
			<div className="todo-item-content">
				<span className="todo-message"> {todo.message} </span>

				<div className="del-upd-buttons">
					<i className="far fa-trash-alt" onClick={() => deleteFromDB(todo.id)} />

					<i className="fas fa-pencil-alt" onClick={() => setObjectToUpdate(todo.id, todo.message)} />
				</div>
			</div>
		</li>
	);
};

export default TodoItem;
