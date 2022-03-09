import React, { useContext, Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import './Navbar.css';
import LoggedInUser from './LoggedInUser';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, colorWhite, colorBlue, colorPink, logout } = authContext;

	const [ menuOpen, setMenuOpen ] = useState(false);

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

	const handleOpenMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const onLogout = () => {
		setMenuOpen(false);
		logout();
	};

	const authLinks = (
		<Fragment>
			{menuOpen ? <AiOutlineClose onClick={handleOpenMenu} /> : <AiOutlineMenu onClick={handleOpenMenu} />}
			{menuOpen && (
				<div className="nav-modal">
					<li>
						<NavLink to="/shopping" activeClassName="selected">
							Inköpslista
						</NavLink>
					</li>
					<li>
						<NavLink to="/todo" activeClassName="selected">
							Att Göra
						</NavLink>
					</li>

					<li>
						<NavLink exact to="/start" activeClassName="selected">
							Förbättringsförslag
						</NavLink>
					</li>
					<li>
						<button className="logout-btn" onClick={onLogout}>
							Logga Ut
						</button>
					</li>
				</div>
			)}

			{/* <li>Hello {user && user.name}</li> */}
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<NavLink to="/login" activeClassName="selected">
					Logga In
				</NavLink>
			</li>
			<li>
				<NavLink to="/register" activeClassName="selected">
					Registrera
				</NavLink>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar-container">
			{isAuthenticated && <LoggedInUser />}
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

export default Navbar;
