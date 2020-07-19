import React, { useEffect, useContext } from 'react';
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
		},
		// eslint-disable-next-line
		[ isAuthenticated, props.history ]
	);

	return (
		<div className="shopping-container">
			{/*<h3 className="shopping-title">Att Handla</h3>*/}
			<ShoppingForm />
			<ShoppingList />
		</div>
	);
};

export default Shopping;
