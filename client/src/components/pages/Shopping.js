import React, { useEffect, useContext, useState } from 'react';
import ShoppingForm from '../shopping/ShoppingForm';
import ShoppingList from '../shopping/ShoppingList';
import AuthContext from '../../context/auth/authContext';

const Shopping = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, isAuthenticated, colorPink } = authContext;

	// validate and put user into state
	useEffect(
		() => {
			if (!isAuthenticated) {
				props.history.push('/login');
			} else {
				loadUser();
			}
			// eslint-disable-next-line
		},
		[ isAuthenticated, props.history ]
	);

	return (
		// <div className={"{pink ? 'shopping-container__pink' : 'shopping-container'}"}>
		<div className={`shopping-container${colorPink ? '__pink' : '__blue'}`}>
			<h3 className="shopping-title">Att Handla</h3>
			<ShoppingForm />
			<ShoppingList />
		</div>
	);
};

export default Shopping;
