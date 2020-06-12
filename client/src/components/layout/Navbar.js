import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout } = authContext;

	// const authLinks = (
	// 	<Fragment>
	// 		<button>Logg Ut</button>
	// 	</Fragment>
	// )

	// const guestLinks = (
	// 	<Fragment>
	// 		<button>Logga Ut</button>
	// 	</Fragment>
	// )

	const [ authRoutes ] = useState([
		{
			name: 'Att Göra: ',
			page: '/'
		},
		{
			name: 'Hemma',
			page: '/home'
		},
		{
			name: 'Handla',
			page: '/shopping'
		},
		{
			name: 'Logga Ut',
			page: '/logout'
		}
	]);

	const [ guestRoutes ] = useState([
		{
			name: 'Registrera',
			page: '/register'
		},
		{
			name: 'Logga In',
			page: '/login'
		}
	]);

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

	const onLogout = () => {
		logout();
	};

	return (
		<div className="navbar-list">
			{isAuthenticated ? (
				<div>
					{authRoutes.map((route, index) => (
						<div key={index} className="navbar-item">
							<li>
								<Link to={route.page}>{route.name}</Link>
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
								<Link to={route.page}>{route.name}</Link>
							</li>
						</div>
					))}
				</div>
			)}

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
