import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			// put the token we get back inside of localStorage
			// -> (we get the token from this action payload)
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			};
		case REGISTER_FAIL:
			// if registration fails, we want to remove the token from localStorage
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
