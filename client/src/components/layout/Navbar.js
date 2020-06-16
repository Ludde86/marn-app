import React, { useState, useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import './Navbar.css';
import LoggedInUser from './LoggedInUser';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, colorWhite, colorBlue, colorPink } = authContext;

	// const [ authRoutes ] = useState([
	// 	{
	// 		name: 'Att Göra: ',
	// 		page: '/'
	// 	},
	// 	{
	// 		name: 'Hemma',
	// 		page: '/home'
	// 	},
	// 	{
	// 		name: 'Handla',
	// 		page: '/shopping'
	// 	}
	// 	// {
	// 	// 	name: 'Logga Ut',
	// 	// 	page: '/logout'
	// 	// }
	// ]);

	// const [ guestRoutes ] = useState([
	// 	{
	// 		name: 'Registrera',
	// 		page: '/register'
	// 	},
	// 	{
	// 		name: 'Logga In',
	// 		page: '/login'
	// 	}
	// ]);

	// const [ routes ] = useState([
	// 	{
	// 		name: 'Att Göra: ',
	// 		page: '/'
	// 	},
	// 	{
	// 		name: 'Hemma',
	// 		page: '/home'
	// 	},
	// 	{
	// 		name: 'Handla',
	// 		page: '/shopping'
	// 	},
	// 	{
	// 		name: 'Registrera',
	// 		page: '/register'
	// 	},
	// 	{
	// 		name: 'Logga In',
	// 		page: '/login'
	// 	}
	// ]);

	const authLinks = (
		<Fragment>
			<li>
				<NavLink exact to="/" activeClassName="selected">
					Förbättringar
				</NavLink>
			</li>
			<li>
				<NavLink to="/home" activeClassName="selected">
					Att Göra
				</NavLink>
			</li>
			<li>
				<NavLink to="/shopping" activeClassName="selected">
					Handla
				</NavLink>
			</li>

			{/* <li>Hello {user && user.name}</li> */}
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<NavLink to="/register">Registrera</NavLink>
			</li>
			<li>
				<NavLink to="/login">Logga In</NavLink>
			</li>
		</Fragment>
	);

	return (
		<div>
			{colorWhite && (
				<div className="navbar-container__white">
					<LoggedInUser />
					<div className="navbar-list">
						<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
					</div>
				</div>
			)}
			{colorBlue && (
				<div className="navbar-container__blue">
					<LoggedInUser />
					<div className="navbar-list">
						<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
					</div>
				</div>
			)}
			{colorPink && (
				<div className="navbar-container__pink">
					<LoggedInUser />
					<div className="navbar-list">
						<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
