import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
// import TodoContext from '../../context/todo/todoContext';

const ShoppingItem = ({ item }) => {
	const shoppingContext = useContext(ShoppingContext);
	const { deleteItem, setEditItem } = shoppingContext;

	return (
		<li className="item-container">
			<span className="item-message">{item.message}</span>

			<span className="item-buttons">
				<button onClick={() => deleteItem(item._id)}>Ta bort</button>
				<button onClick={() => setEditItem(item._id, item.message)}>Ändra</button>
			</span>
		</li>
	);
};

export default ShoppingItem;
