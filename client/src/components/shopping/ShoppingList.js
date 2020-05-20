import React, { useEffect, useContext } from 'react';
import ShoppingContext from '../../context/shopping/shoppingContext';
import ShoppingItem from './ShoppingItem';

const ShoppingList = () => {
	const shoppingContext = useContext(ShoppingContext);
	const { shoppingList, getShoppingList } = shoppingContext;

	useEffect(
		() => {
			getShoppingList();
			setInterval(getShoppingList, 1000);
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<ul className="list-container">
			{shoppingList.map((item, index) => <ShoppingItem key={index} item={item} />)}
		</ul>
	);
};

export default ShoppingList;
