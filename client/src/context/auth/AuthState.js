import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	GET_USER,
	AUTH_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_WHITE,
	SET_BLUE,
	SET_PINK
} from '../types';

const AuthState = (props) => {
	const initialState = {
		user: null,
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		error: null,
		colorWhite: true,
		colorBlue: false,
		colorPink: false
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	// Load User -> to keep isAuthenticated to true
	// -> here we set the user state, with GET_USER
	const loadUser = async () => {
		// load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		try {
			// getAuth checks if its a valid user
			// in order to make this request, we need a token (its a private route)
			// -> so we want to store a global header with that token
			const res = await axios.get('/api/getAuth');
			dispatch({
				type: GET_USER,
				payload: res.data // when we get the user, we will get the users data back
			});
		} catch (error) {
			dispatch({
				type: AUTH_FAIL
			});
		}
	};

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
				type: REGISTER_SUCCESS,
				payload: res.data
			});

			loadUser();
		} catch (error) {
			// if an error, the response will be a message we created ('Name already exists')
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg
			});
		}
	};

	// Login User -> Get a Token
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/postAuth', formData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
			loadUser();
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.msg
			});
		}
	};

	// Logout User -> Destroy the Token, and clear things up
	const logout = () => {
		dispatch({
			type: LOGOUT
		});
	};

	const handleSetWhite = (active) => {
		dispatch({
			type: SET_WHITE,
			payload: active
		});
	};

	const handleSetBlue = (active) => {
		dispatch({
			type: SET_BLUE,
			payload: active
		});
	};

	const handleSetPink = (active) => {
		dispatch({
			type: SET_PINK,
			payload: active
		});
	};

	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				error: state.error,
				colorWhite: state.colorWhite,
				colorBlue: state.colorBlue,
				colorPink: state.colorPink,
				register,
				loadUser,
				login,
				logout,
				handleSetWhite,
				handleSetBlue,
				handleSetPink
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
