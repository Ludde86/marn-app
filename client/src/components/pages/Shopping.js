import React from 'react';
import ShoppingForm from '../shopping/ShoppingForm';
import ShoppingList from '../shopping/ShoppingList';

const Shopping = () => {
	return (
		<div className="shopping-container">
			<h3 className="shopping-title">Shopping List</h3>
			<ShoppingForm />
			<ShoppingList />
		</div>
	);
};

export default Shopping;
