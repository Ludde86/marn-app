import React from 'react';
import PostState from './context/post/PostState';
import PostForm from './components/post/PostForm';
import PostList from './components/post/PostList';
import './App.css';

const App = () => {
	return (
		<div className="app">
			<PostState>
				<PostForm />
				<PostList />
			</PostState>
		</div>
	);
};

export default App;
