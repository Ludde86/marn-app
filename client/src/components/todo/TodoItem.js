import React, { useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const TodoItem = ({ todo }) => {
	const todoContext = useContext(TodoContext);
	const { deleteTodo, setObjectToUpdate, setIsChecked } = todoContext;

	return (
		<li>
			<div className="todo-item-content" onClick={() => setIsChecked(todo)}>
				<span
					className="todo-message"
					style={todo.isChecked ? { textDecoration: 'line-through', color: 'lightgrey' } : null}
				>
					{' '}
					{todo.message}{' '}
				</span>

				<div className="del-upd-buttons">
					<i className="fas fa-pencil-alt" onClick={() => setObjectToUpdate(todo._id, todo.message)} />
					<i className="far fa-trash-alt" onClick={() => deleteTodo(todo._id)} />
				</div>
			</div>
		</li>
	);
};

export default TodoItem;
