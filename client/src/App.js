import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
	const [ posts, setPosts ] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

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
			.then((res) => setPosts(res.data))
			.catch((err) => console.log('Somethin went wrong, when fetching data'));
	};

	const displayPosts = () => {
		if (!posts.length) {
			return null;
		} else {
			return posts.map((item) => (
				<div key={item._id}>
					<h3>{item.title}</h3>
					<p>{item.body}</p>
				</div>
			));
		}
	};

	return (
		<div>
			<h2>Form</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<textarea
						name="body"
						placeholder="Body"
						value={body}
						cols="30"
						rows="10"
						onChange={(e) => setBody(e.target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
			<div className="blog-post">{displayPosts()}</div>
		</div>
	);
};

export default App;
