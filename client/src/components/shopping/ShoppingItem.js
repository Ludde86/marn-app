import React, { useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
import { FiEdit, FiMinus } from 'react-icons/fi';

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

			<div className="item-btn">
				<div className="edit-btn">
					<FiEdit onClick={() => setEditItem(item._id, item.message)} />
				</div>
				<div className="delete-btn">
					<FiMinus onClick={() => deleteItem(item._id)} />
				</div>
			</div>
		</li>
	);
};

export default ShoppingItem;
