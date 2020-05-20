import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import { SET_TITLE, SET_BODY, SET_POSTS, EDIT_MESSAGE } from '../types';
import TodoContext from '../todo/todoContext';

const PostState = (props) => {
	const initialState = {
		title: '',
		body: '',
		posts: []
	};

	const [ state, dispatch ] = useReducer(postReducer, initialState);
	const todoContext = useContext(TodoContext);
	// const { clearMessage } = todoContext;

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
		} catch (error) {
			console.error(error);
		}
	};

	const updateItem = async (e, id, message) => {
		try {
			e.preventDefault();
			await axios.put(`/api/putPst/${id}`, { update: message });
			// setFalse();
			// clearMessage();
		} catch (error) {
			console.error(error);
		}
	};

	const setEditItem = (id, message) => {
		// setTrue();
		dispatch({
			type: EDIT_MESSAGE,
			payload: { id, message }
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

	const setPosts = (data) => {
		dispatch({
			type: SET_POSTS,
			payload: data
		});
	};

	const displayPosts = (posts) => {
		if (!posts.length) {
			return null;
		} else {
			return posts.map((item) => (
				<div key={item._id} className="blog-post__display">
					<div className="blog-post-message">
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</div>

					<div className="item-buttons">
						<button onClick={() => deleteItem(item._id)}>Ta bort</button>
						<button onClick={() => setEditItem(item._id, item.message)}>Ändra</button>
					</div>
				</div>
			));
		}
	};

	return (
		<PostContext.Provider
			value={{
				title: state.title,
				body: state.body,
				posts: state.posts,
				handleSubmit,
				displayPosts,
				setTitle,
				setBody,
				updateItem
			}}
		>
			{props.children}
		</PostContext.Provider>
	);
};

export default PostState;
