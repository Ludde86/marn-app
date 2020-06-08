import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import { SET_TITLE, SET_BODY, SET_POSTS, EDIT_MESSAGE, CLEAR_TITLE, CLEAR_BODY } from '../types';
import TodoContext from '../todo/todoContext';

const PostState = (props) => {
	const initialState = {
		title: '',
		body: '',
		posts: [],
		editMessage: ''
	};

	const [ state, dispatch ] = useReducer(postReducer, initialState);
	const todoContext = useContext(TodoContext);
	const { setTrue, setFalse } = todoContext;

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, []);

	const { title, body } = state;

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			title,
			body
		};
		axios({
			url: '/api/save',
			method: 'POST',
			data: payload
		})
			.then(() => {
				console.log('Data has been sent to the server');
				setTitle('');
				setBody('');
				getPosts();
			})
			.catch(() => {
				console.log('Something went wrong');
			});
	};

	const getPosts = () => {
		axios
			.get('/api')
			.then((response) => {
				const data = response.data;
				setPosts(data);
			})
			.catch((err) => console.log('Somethin went wrong, when fetching data'));
	};

	const deleteItem = async (id) => {
		try {
			await axios.delete(`/api/deletePost/${id}`);
			getPosts();
		} catch (error) {
			console.error(error);
		}
	};

	const updateItem = async (e, id, title, body) => {
		try {
			e.preventDefault();
			await axios.put(`/api/putPost/${id}`, { update: { title, body } });
			setFalse();
			clearTitle();
			clearBody();
			getPosts();
		} catch (error) {
			console.error(error);
		}
	};

	const setIsChecked = async (item) => {
		let isChecked = undefined;
		if (item.isChecked) {
			isChecked = false;
		} else {
			isChecked = true;
		}

		try {
			await axios.put(`/api/putPostChecked/${item._id}`, { update: isChecked });
			getPosts();
		} catch (error) {
			console.error(error);
		}
	};

	const setEditItem = (id, title, body) => {
		setTrue();
		dispatch({
			type: EDIT_MESSAGE,
			payload: { id, title, body }
		});
	};

	const setTitle = (title) => {
		dispatch({
			type: SET_TITLE,
			payload: title
		});
	};

	const setBody = (body) => {
		dispatch({
			type: SET_BODY,
			payload: body
		});
	};

	const clearTitle = () => {
		dispatch({
			type: CLEAR_TITLE
		});
	};

	const clearBody = () => {
		dispatch({
			type: CLEAR_BODY
		});
	};

	const setPosts = (data) => {
		dispatch({
			type: SET_POSTS,
			payload: data
		});
	};

	return (
		<PostContext.Provider
			value={{
				title: state.title,
				body: state.body,
				posts: state.posts,
				editMessage: state.editMessage,
				postChecked: state.postChecked,
				handleSubmit,
				setTitle,
				setBody,
				deleteItem,
				updateItem,
				setEditItem,
				clearTitle,
				clearBody,
				setIsChecked
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
