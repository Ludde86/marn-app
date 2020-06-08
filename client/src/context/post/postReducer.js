import { SET_TITLE, SET_BODY, SET_POSTS, EDIT_MESSAGE, CLEAR_TITLE, CLEAR_BODY } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_TITLE:
			return {
				...state,
				title: action.payload
			};
		case SET_BODY:
			return {
				...state,
				body: action.payload
			};
		case SET_POSTS:
			return {
				...state,
				posts: action.payload
			};
		case EDIT_MESSAGE:
			return {
				...state,
				editMessage: action.payload
			};
		case CLEAR_TITLE:
			return {
				...state,
				title: ''
			};
		case CLEAR_BODY:
			return {
				...state,
				body: ''
			};
		default:
			return state;
	}
};
