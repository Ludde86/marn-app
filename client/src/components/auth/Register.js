import React, { useState } from 'react';

const Register = () => {
	const [ user, setUser ] = useState({
		name: '',
		password: '',
		repeatPassword: ''
	});

	const { name, password, repeatPassword } = user;

	return (
		<div className="form-container">
			<h1>Skapa Användare</h1>
			<form>
				<label htmlFor="name">Namn</label>
				<input type="text" name="name" />
				<label htmlFor="password">Lösen</label>
				<input type="password" name="password" />
				<label htmlFor="repeatPassword">Repetera Lösen</label>
				<input type="password" name="repeatPassword" />
			</form>
		</div>
	);
};

export default Register;
