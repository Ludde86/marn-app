import React, { useState } from 'react';

const Login = () => {
	const [ user, setUser ] = useState({
		name: '',
		password: ''
	});

	const { name, password } = user;

	return (
		<div className="form-container">
			<h1>Logga In</h1>
			<form>
				<label htmlFor="name">Namn</label>
				<input type="text" name="name" />
				<label htmlFor="password">Lösen</label>
				<input type="password" name="password" />
			</form>
		</div>
	);
};

export default Login;
