import React, { useEffect, useContext, useState } from 'react';
import ShoppingForm from '../shopping/ShoppingForm';
import ShoppingList from '../shopping/ShoppingList';
import AuthContext from '../../context/auth/authContext';

const Shopping = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, isAuthenticated, colorWhite, colorBlue, colorPink } = authContext;

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
		<div>
			{colorWhite && (
				<div className="shopping-container__white">
					{/*<h3 className="shopping-title">Att Handla</h3>*/}
					<ShoppingForm />
					<ShoppingList />
				</div>
			)}
			{colorBlue && (
				<div className="shopping-container__blue">
					{/*<h3 className="shopping-title">Att Handla</h3>*/}
					<ShoppingForm />
					<ShoppingList />
				</div>
			)}
			{colorPink && (
				<div className="shopping-container__pink">
					{/*<h3 className="shopping-title">Att Handla</h3>*/}
					<ShoppingForm />
					<ShoppingList />
				</div>
			)}
		</div>
	);
};

export default Shopping;
