import { REGISTER_SUCCESS, REGISTER_FAIL, GET_USER, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			// put the token we get back inside of localStorage
			// -> (we get the token from this action payload)
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			};
		case REGISTER_FAIL:
		case AUTH_FAIL:
		case LOGIN_FAIL:
			// if registration or get authentication fails, we want to remove the token from localStorage
			// -> and clean stuff up
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload
			};
		default:
			return state;
	}
};
