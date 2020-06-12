import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [ routes ] = useState([
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
			name: 'Register',
			page: '/register'
		}
	]);

	return (
		<div className="navbar-list">
			{routes.map((route, index) => (
				<div key={index} className="navbar-item">
					<li>
						<Link to={route.page}>{route.name}</Link>
					</li>
				</div>
			))}
		</div>
	);
};

export default Navbar;
