import React, { useContext, useEffect } from 'react';
import PostForm from '../post/PostForm';
import PostList from '../post/PostList';
import AuthContext from '../../context/auth/authContext';

const Start = () => {
	const authContext = useContext(AuthContext);
	const { loadUser } = authContext;

	// validate and put user into state
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<PostForm />
			<PostList />
		</div>
	);
};

export default Start;
