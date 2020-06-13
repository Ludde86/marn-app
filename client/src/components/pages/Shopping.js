import React, { useEffect, useContext } from 'react';
import ShoppingForm from '../shopping/ShoppingForm';
import ShoppingList from '../shopping/ShoppingList';
import AuthContext from '../../context/auth/authContext';

const Shopping = () => {
	const authContext = useContext(AuthContext);
	const { loadUser } = authContext;

	// validate and put user into state
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="shopping-container">
			<h3 className="shopping-title">Inköpslista</h3>
			<ShoppingForm />
			<ShoppingList />
		</div>
	);
};

export default Shopping;
