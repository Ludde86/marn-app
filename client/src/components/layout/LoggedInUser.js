import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const LoggedInUser = () => {
	const authContext = useContext(AuthContext);
	const { user } = authContext;
	return (
		<div className="logged-in-container">
			{user && (
				<div>
					<span>Inloggad som:</span> <span className="logged-in-user">{user.name}</span>
				</div>
			)}
		</div>
	);
};

export default LoggedInUser;
