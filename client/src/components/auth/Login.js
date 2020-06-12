import React, { useState } from 'react';

const Login = () => {
	const [ user, setUser ] = useState({
		name: '',
		password: ''
	});

	const { name, password } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('Användare Inloggad');
	};

	return (
		<div className="form-container">
			<h1>Logga In</h1>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Namn</label>
				<input type="text" name="name" value={name} onChange={onChange} />
				<label htmlFor="password">Lösen</label>
				<input type="password" name="password" value={password} onChange={onChange} />
				<button type="submit">Logga In</button>
			</form>
		</div>
	);
};

export default Login;
