import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
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
			})
			.catch(() => {
				console.log('Something went wrong');
			});
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
		</div>
	);
};

export default App;
