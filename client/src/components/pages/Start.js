import React, { useContext, useEffect } from 'react';
import PostForm from '../post/PostForm';
import PostList from '../post/PostList';
import AuthContext from '../../context/auth/authContext';
import LoginPage from './LoginPage';

const Start = (props) => {
	const authContext = useContext(AuthContext);
	const { loadUser, isAuthenticated } = authContext;

	// validate and put user into state
	useEffect(
		() => {
			if (!isAuthenticated) {
				props.history.push('/login');
			} else {
				loadUser();
			}
			// eslint-disable-next-line
		},
		[ isAuthenticated, props.history ]
	);

	return (
		<div>
			<div>
				<PostForm />
				<PostList />
			</div>
			{/*{isAuthenticated ? (
				<div>
					<PostForm />
					<PostList />
				</div>
			) : (
				<LoginPage />
			)}*/}
		</div>
	);
};

export default Start;
