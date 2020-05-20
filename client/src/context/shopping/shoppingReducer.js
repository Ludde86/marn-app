import { GET_SHOPPINGLIST, ADD_SHOPPINGITEM, EDIT_MESSAGE } from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_SHOPPINGLIST:
			return {
				...state,
				shoppingList: action.payload
			};
		case ADD_SHOPPINGITEM:
			return {
				...state,
				shoppingList: [ ...state.shoppingList, action.payload ]
			};
		case EDIT_MESSAGE:
			return {
				...state,
				editItem: action.payload,
				isEdit: true
			};
		default:
			return state;
	}
};
