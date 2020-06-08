import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ShoppingContext from './shoppingContext';
import shoppingReducer from './shoppingReducer';
import { GET_SHOPPINGLIST, ADD_SHOPPINGITEM, EDIT_MESSAGE } from '../types';
import TodoContext from '../todo/todoContext';

const ShoppingState = (props) => {
	const initialState = {
		shoppingList: [],
		editItem: { id: '', message: '' }
	};

	const [ state, dispatch ] = useReducer(shoppingReducer, initialState);
	const todoContext = useContext(TodoContext);

	const { setTrue, setFalse, clearMessage } = todoContext;

	const getShoppingList = async (data) => {
		try {
			const res = await axios.get('/api/getShopping');
			dispatch({
				type: GET_SHOPPINGLIST,
				payload: res.data.data
			});
		} catch (error) {
			console.error(error);
		}
	};

	const addShoppingItem = async (e, message) => {
		try {
			e.preventDefault();
			const res = await axios.post('/api/postShopping', { message: message });
			dispatch({
				type: ADD_SHOPPINGITEM,
				payload: res
			});
			clearMessage();
		} catch (error) {
			console.error(error);
		}
	};

	const deleteItem = async (id) => {
		try {
			await axios.delete(`/api/deleteShopping/${id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const updateItem = async (e, id, message) => {
		try {
			e.preventDefault();
			await axios.put(`/api/putShopping/${id}`, { update: message });
			setFalse();
			clearMessage();
		} catch (error) {
			console.error(error);
		}
	};

	const setEditItem = (id, message) => {
		setTrue();
		dispatch({
			type: EDIT_MESSAGE,
			payload: { id, message }
		});
	};

	const setIsChecked = async (item) => {
		let isChecked = undefined;
		if (item.isChecked) {
			isChecked = false;
		} else {
			isChecked = true;
		}

		try {
			await axios.put(`/api/putShoppingChecked/${item._id}`, { update: isChecked });
			getShoppingList();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ShoppingContext.Provider
			value={{
				shoppingList: state.shoppingList,
				message: state.message,
				editItem: state.editItem,
				getShoppingList,
				addShoppingItem,
				deleteItem,
				updateItem,
				setEditItem,
				setIsChecked
			}}
		>
			{props.children}
		</ShoppingContext.Provider>
	);
};

export default ShoppingState;
