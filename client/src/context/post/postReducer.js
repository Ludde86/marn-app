import { SET_TITLE, SET_BODY, SET_POSTS } from '../types';

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
		default:
			return state;
	}
};
