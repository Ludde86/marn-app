import React, { useEffect, useContext } from 'react';
import ShoppingForm from '../shopping/ShoppingForm';
import ShoppingList from '../shopping/ShoppingList';
import AuthContext from '../../context/auth/authContext';
import ShoppingContext from '../../context/shopping/shoppingContext';
import { FcDeleteDatabase } from 'react-icons/fc';

const Shopping = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, isAuthenticated, colorWhite, colorBlue, colorPink } = authContext;

	const shoppingContext = useContext(ShoppingContext);
	const { clearShoppingList } = shoppingContext;

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
			<div className="clear-btn-container">
				<button className="clear-button" onClick={clearShoppingList}>
					<FcDeleteDatabase />
				</button>
			</div>
		</div>
	);
};

export default Shopping;
