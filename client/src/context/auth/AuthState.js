import React, { useReducer } from 'react';
import axios from 'axios';
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
	// -> the data we type in the register form will be passed in here as an object (formData)
	const register = async (formData) => {
		// since we are making a post request and we are sending data
		// -> we are gonna need that content-type header of application/json
		// -> with axios we create a config object for that
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('api/postUser', formData, config);

			// when we send our form data to postUser
			// it gonna create:
			// -> a new user (with name and password)
			// -> it gonna bcrypt the password
			// -> and this user will assign (and generate) a token connected with the users id
			// -> and all this will will respond with the generated token (res.data)
			dispatch({
				type: REGISTER,
				payload: res.data
			});
		} catch (error) {
			// if an error, the response will be a message we created ('Name already exists')
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg
			});
		}
	};

	// Login User -> Get a Token

	// Logout User -> Destroy the Token, and clear things up

	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				error: state.error,
				register
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
