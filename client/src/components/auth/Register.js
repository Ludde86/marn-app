import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import './Register.css';

const Register = (props) => {
	const authContext = useContext(AuthContext);
	const { register, isAuthenticated } = authContext;

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
		password: '',
		repeatPassword: ''
	});

	const { name, password, repeatPassword } = user;

	// ...user = current value
	// -> target the name attribute (name="name", name="password", name="repeatPassword")
	// -> set it to the value
	// (test each onChange on every name attribute separately)
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		register({
			name,
			password
		});
	};

	return (
		<div className="register-container">
			<h1>Skapa Användare</h1>
			<form className="register-form-container" onSubmit={onSubmit}>
				<label htmlFor="name">Namn</label>
				<input type="text" name="name" value={name} onChange={onChange} />
				<label htmlFor="password">Lösen</label>
				<input type="password" name="password" value={password} onChange={onChange} />
				<label htmlFor="repeatPassword">Repetera Lösen</label>
				<input type="password" name="repeatPassword" value={repeatPassword} onChange={onChange} />
				<button type="submit">Skapa Användare</button>
			</form>
		</div>
	);
};

export default Register;
