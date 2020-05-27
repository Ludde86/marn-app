import React, { useContext } from 'react';
import TodoContext from '../../context/todo/todoContext';

const TodoForm = () => {
	const todoContext = useContext(TodoContext);
	const {
		message,
		setMessage,
		putDataToDB,
		isEdit,
		objectToUpdate,
		setObjectToUpdate,
		idToUpdate,
		updateDB
	} = todoContext;

	return (
		<div className="todo-form-container">
			{isEdit ? (
				<form onSubmit={(e) => updateDB(e, idToUpdate, objectToUpdate)}>
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
						<i class="fas fa-plus" onClick={(e) => putDataToDB(e, message)} />
					</div>
				</form>
			)}
		</div>
	);
};

export default TodoForm;
