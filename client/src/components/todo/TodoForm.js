import React, { useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const TodoForm = () => {
	const todoContext = useContext(TodoContext);
	const {
		message,
		setMessage,
		addTodoItem,
		isEdit,
		objectToUpdate,
		setObjectToUpdate,
		idToUpdate,
		updateTodo
	} = todoContext;

	return (
		<div className="todo-form-container">
			{isEdit ? (
				<form onSubmit={(e) => updateTodo(e, idToUpdate, objectToUpdate)}>
					<input
						className="todo-input-field"
						type="text"
						onChange={(e) => setObjectToUpdate(idToUpdate, e.target.value)}
						name="objectToUpdate"
						value={objectToUpdate}
						placeholder={objectToUpdate}
						autocomplete="off"
					/>
					<div className="todo-btn-container">
						<button className="todo-update-btn" type="submit">
							<i className="fas fa-plus" />
						</button>
					</div>
				</form>
			) : (
				<form onSubmit={(e) => addTodoItem(e, message)}>
					<input
						className="todo-input-field"
						type="text"
						onChange={(e) => setMessage(e.target.value)}
						name="message"
						value={message}
						placeholder="Lägg till att göra"
						autocomplete="off"
					/>
					<div className="todo-btn-container">
						<button className="todo-add-btn" type="submit">
							<i className="fas fa-plus" />
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default TodoForm;
