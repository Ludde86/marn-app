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
					<div className="todo-form-submit">
						<input
							type="text"
							onChange={(e) => setObjectToUpdate(idToUpdate, e.target.value)}
							name="objectToUpdate"
							value={objectToUpdate}
							placeholder={objectToUpdate}
						/>
						<input className="update-todo-btn" type="submit" value="Uppdatera" />
					</div>
				</form>
			) : (
				<form>
					<div className="todo-form-submit">
						<input
							type="text"
							onChange={(e) => setMessage(e.target.value)}
							name="message"
							value={message}
							placeholder="Lägg till att göra"
						/>
						<i className="fas fa-plus" onClick={(e) => addTodoItem(e, message)} />
					</div>
				</form>
			)}
		</div>
	);
};

export default TodoForm;
