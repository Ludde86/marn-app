import React, { useEffect, useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
import ShoppingItem from './ShoppingItem';

const ShoppingList = () => {
	const shoppingContext = useContext(ShoppingContext);
	const { shoppingList, getShoppingList } = shoppingContext;

	useEffect(
		() => {
			// getShoppingList();
			const interval = setInterval(() => {
				getShoppingList();
			}, 500);
			return () => clearInterval(interval);
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<ul className="list-container">
			{shoppingList.map((item, index) => <ShoppingItem key={item._id} item={item} />)}
		</ul>
	);
};

export default ShoppingList;
