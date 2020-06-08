import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';

const ShoppingItem = ({ item }) => {
	const shoppingContext = useContext(ShoppingContext);
	const { deleteItem, setEditItem, setIsChecked } = shoppingContext;

	return (
		<li className="item-container" onClick={() => setIsChecked(item)}>
			<span
				className="item-message"
				style={item.isChecked ? { textDecoration: 'line-through', color: 'grey' } : null}
			>
				{item.message}
			</span>

			<span>
				<i className="far fa-trash-alt" onClick={() => deleteItem(item._id)} />

				<i className="fas fa-pencil-alt" onClick={() => setEditItem(item._id, item.message)} />
			</span>
		</li>
	);
};

export default ShoppingItem;
