import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
import TodoContext from '../../context/todo/todoContext';

const ShoppingForm = () => {
	const shoppingContext = useContext(ShoppingContext);
	const todoContext = useContext(TodoContext);
	const { addShoppingItem, updateItem, editItem, setEditItem, clearShoppingList } = shoppingContext;
	const { message, setMessage, isEdit } = todoContext;

	return (
		<div>
			{isEdit ? (
				<form className="form-container" onSubmit={(e) => updateItem(e, editItem.id, editItem.message)}>
					<input
						className="input-field"
						type="text"
						onChange={(e) => setEditItem(editItem.id, e.target.value)}
						name="editItem"
						value={editItem.message}
						placeholder={editItem.message}
					/>
					<button className="input-update" type="submit">
						<i className="fas fa-plus" />
					</button>
				</form>
			) : (
				<form className="form-container" onSubmit={(e) => addShoppingItem(e, message)}>
					<input
						className="input-field"
						type="text"
						name="message"
						value={message}
						placeholder="Lägg till att handla..."
						onChange={(e) => setMessage(e.target.value)}
					/>

					<button className="input-submit" type="submit">
						<i className="fas fa-plus" />
					</button>
				</form>
			)}
		</div>
	);
};

export default ShoppingForm;
