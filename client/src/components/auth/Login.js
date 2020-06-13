import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
	const authContext = useContext(AuthContext);
	const { login, isAuthenticated } = authContext;

	// useEffect for errors (validation in form)
	// redirect if register success
	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/');
			}
		},
		// eslint-disable-next-line
		[ isAuthenticated, props.history ]
	);

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
		login({
			name,
			password
		});
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
