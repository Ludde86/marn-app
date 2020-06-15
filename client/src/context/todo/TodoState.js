import React from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
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

const TodoState = (props) => {
	const initialState = {
		todos: [],
		message: '',
		intervalIsSet: false,
		objectToUpdate: '',
		idToUpdate: null,
		isEdit: false
	};

	const [ state, dispatch ] = useReducer(todoReducer, initialState);
	const { todos } = state;

	const getTodos = async () => {
		// const production = 'https://peaceful-journey-03079.herokuapp.com/api/getData';
		// const development = 'http://localhost:3001/api/getData';
		// const url = process.env.NODE_ENV ? production : development;
		// fetch('/api/getData', { method: 'GET' }).then((todos) => todos.json()).then((res) =>
		// 	dispatch({
		// 		type: GET_DATA,
		// 		payload: res.data
		// 	})
		// );

		try {
			const res = await axios.get('/api/getTodoList');
			console.log('res todos', res.data);
			dispatch({
				type: GET_DATA,
				payload: res.data
			});
		} catch (error) {
			console.error(error);
		}
	};

	const addTodoItem = (e, message) => {
		e.preventDefault();
		let currentIds = todos.map((todo) => todo.id);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded)) {
			++idToBeAdded;
		}

		axios.post('/api/postTodo', {
			id: idToBeAdded,
			message: message
		});
		clearMessage();
	};

	const updateTodo = async (e, id, message) => {
		try {
			e.preventDefault();
			await axios.put(`/api/putTodo/${id}`, { update: message });
			setFalse(); // do I need this? or can I do different
			clearMessage(); // do I need this? or can I do different
		} catch (error) {
			console.error(error);
		}

		// let objIdToUpdate = null;
		// todos.forEach((todo) => {
		// 	if (todo.id === idToUpdate) {
		// 		objIdToUpdate = todo._id;
		// 	}
		// });

		// axios.put('/api/putTodo', {
		// 	id: objIdToUpdate,
		// 	update: { message: objectToUpdate }
		// });
		// setFalse();
	};

	const deleteFromDB = (idTodelete) => {
		let objIdToDelete = null;
		todos.forEach((todo) => {
			if (todo.id === idTodelete) {
				objIdToDelete = todo._id;
			}
		});

		axios.delete('/api/deleteData', {
			data: {
				id: objIdToDelete
			}
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
			await axios.put(`/api/putTodoChecked/${item._id}`, { update: isChecked });
			getTodos();
		} catch (error) {
			console.error(error);
		}
	};

	const setIntervalIsSet = (interval) => {
		dispatch({
			type: SET_INTERVAL,
			payload: interval
		});
	};

	const setMessage = (message) => {
		dispatch({
			type: SET_MESSAGE,
			payload: message
		});
	};

	const setObjectToUpdate = (id, message) => {
		setIdToUpdate(id);
		dispatch({
			type: UPDATE_MESSAGE,
			payload: message
		});
	};

	const setIdToUpdate = (id) => {
		dispatch({
			type: SET_ID,
			payload: id
		});
	};

	const clearMessage = () => {
		dispatch({
			type: CLEAR_MESSAGE,
			payload: ''
		});
	};

	const setTrue = () => {
		dispatch({
			type: SET_TRUE,
			payload: true
		});
	};

	const setFalse = () => {
		dispatch({
			type: SET_FALSE,
			payload: false
		});
	};

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				message: state.message,
				intervalIsSet: state.intervalIsSet,
				objectToUpdate: state.objectToUpdate,
				idToUpdate: state.idToUpdate,
				isEdit: state.isEdit,
				getTodos,
				addTodoItem,
				updateTodo,
				setMessage,
				deleteFromDB,
				setObjectToUpdate,
				setIdToUpdate,
				setIntervalIsSet,
				setTrue,
				setFalse,
				clearMessage,
				setIsChecked
			}}
		>
			{props.children}
		</TodoContext.Provider>
	);
};

export default TodoState;
