import {
	GET_DATA,
	SET_INTERVAL,
	SET_MESSAGE,
	UPDATE_MESSAGE,
	CLEAR_MESSAGE,
	SET_ID,
	SET_TRUE,
	SET_FALSE
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_DATA:
			return {
				...state,
				todos: action.payload
				// set all data from fetch getData into state array
			};
		case SET_INTERVAL:
			return {
				...state,
				intervalIsSet: action.payload
			};
		case SET_MESSAGE:
			return {
				...state,
				message: action.payload
			};
		case UPDATE_MESSAGE:
			return {
				...state,
				objectToUpdate: action.payload,
				isEdit: true
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: action.payload
			};
		case SET_ID:
			return {
				...state,
				idToUpdate: action.payload
			};
		case SET_TRUE:
			return {
				...state,
				isEdit: action.payload
			};
		case SET_FALSE:
			return {
				...state,
				isEdit: action.payload
			};
		default:
			return state;
	}
};
