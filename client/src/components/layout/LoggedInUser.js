import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import './LoggedInUser.css';

const LoggedInUser = () => {
	const authContext = useContext(AuthContext);
	const { user, logout } = authContext;

	const onLogout = () => {
		logout();
	};

	return (
		<div className="logged-in">
			{user && (
				<div className="logged-in-container">
					<div className="logged-in-item">
						<span>Inloggad som:</span> <span className="logged-in-user">{user.name}</span>
					</div>
					<button className="logout-btn" onClick={onLogout}>
						Logga Ut
					</button>
				</div>
			)}
		</div>
	);
};

export default LoggedInUser;
