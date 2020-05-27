import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';

const ShoppingItem = ({ item }) => {
	const shoppingContext = useContext(ShoppingContext);
	const { deleteItem, setEditItem } = shoppingContext;

	return (
		<li className="item-container">
			<span className="item-message">{item.message}</span>

			<span>
				<i className="far fa-trash-alt" onClick={() => deleteItem(item._id)} />

				<i className="fas fa-pencil-alt" onClick={() => setEditItem(item._id, item.message)} />
			</span>
		</li>
	);
};

export default ShoppingItem;
