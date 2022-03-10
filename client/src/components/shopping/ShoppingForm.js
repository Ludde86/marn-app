import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
import TodoContext from '../../context/todo/todoContext';
import { FiRefreshCcw, FiPlus } from 'react-icons/fi';

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
					<button disabled={editItem.message === '' ? true : false} className="input-submit" type="submit">
						<FiRefreshCcw />
					</button>
				</form>
			) : (
				<form className="form-container" onSubmit={(e) => addShoppingItem(e, message)}>
					<input
						className="input-field"
						type="text"
						name="message"
						value={message}
						placeholder="Lägg till..."
						onChange={(e) => setMessage(e.target.value)}
					/>

					<button disabled={message === '' ? true : false} className="input-submit" type="submit">
						<FiPlus size={20} />
					</button>
				</form>
			)}
		</div>
	);
};

export default ShoppingForm;
