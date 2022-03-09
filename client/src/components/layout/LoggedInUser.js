import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import './LoggedInUser.css';

const LoggedInUser = () => {
	const authContext = useContext(AuthContext);
	const { user, handleSetWhite, handleSetBlue, handleSetPink, colorWhite, colorBlue, colorPink } = authContext;

	return (
		<div>
			{user && (
				<div className="logged-in-container">
					<div className="logged-in-item">
						<span>Inloggad som:</span> <span className="logged-in-user">{user.name}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoggedInUser;
