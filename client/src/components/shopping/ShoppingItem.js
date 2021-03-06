import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';

const ShoppingItem = ({ item }) => {
	const shoppingContext = useContext(ShoppingContext);
	const { deleteItem, setEditItem, setIsChecked } = shoppingContext;

	return (
		<li className="item-container">
			<span
				onClick={() => setIsChecked(item)}
				className="item-message"
				style={item.isChecked ? { textDecoration: 'line-through', color: 'grey' } : null}
			>
				{item.message}
			</span>

			<span className="item-btn">
				<div className="edit-btn">
					<i className="fas fa-pencil-alt" onClick={() => setEditItem(item._id, item.message)} />
				</div>
				<div className="delete-btn">
					<i className="fas fa-minus" onClick={() => deleteItem(item._id)} />
				</div>
			</span>
		</li>
	);
};

export default ShoppingItem;
