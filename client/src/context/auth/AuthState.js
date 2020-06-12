import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = (props) => {
	const initialState = {
		user: null,
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	// Load User

	// Register User -> Generate a Token

	// Login User -> Get a Token

	// Logout User -> Destroy the Token, and clear things up

	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				error: state.error
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
