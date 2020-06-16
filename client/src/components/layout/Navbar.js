import React, { useState, useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import './Navbar.css';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

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
					Att Göra:
				</NavLink>
			</li>
			<li>
				<NavLink to="/home" activeClassName="selected">
					Hemma
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
		<div className="navbar-list">
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>

			{/*{isAuthenticated ? (
				<div>
					{authRoutes.map((route, index) => (
						<div key={index} className="navbar-item">
							<li>
								<NavLink to={route.page}>{route.name}</Link>
							</li>
						</div>
					))}
					<div>
						<button onClick={onLogout}>Logga ut</button>
					</div>
				</div>
			) : (
				<div>
					{guestRoutes.map((route, index) => (
						<div key={index} className="navbar-item">
							<li>
								<NavLink to={route.page}>{route.name}</Link>
							</li>
						</div>
					))}
				</div>
					)}*/}

			{/*{routes.map((route, index) => (
				<div key={index} className="navbar-item">
					<li>
						<Link to={route.page}>{route.name}</Link>
					</li>
				</div>
			))}*/}
		</div>
	);
};

export default Navbar;
