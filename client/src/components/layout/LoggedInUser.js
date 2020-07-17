import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import './LoggedInUser.css';

const LoggedInUser = () => {
	const authContext = useContext(AuthContext);
	const {
		user,
		logout,
		handleSetWhite,
		handleSetBlue,
		handleSetPink,
		colorWhite,
		colorBlue,
		colorPink
	} = authContext;

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
					<div className="logged-in-btn">
						<button className="logout-btn" onClick={onLogout}>
							Logga Ut
						</button>
						{/*{colorWhite && (
							<button className="color-theme-btn" onClick={() => handleSetBlue(true)}>
								Blå
							</button>
						)}

						{colorBlue && (
							<button className="color-theme-btn" onClick={() => handleSetPink(true)}>
								Rosa
							</button>
						)}

						{colorPink && (
							<button className="color-theme-btn" onClick={() => handleSetWhite(true)}>
								Vit
							</button>
						)}*/}
					</div>
				</div>
			)}
		</div>
	);
};

export default LoggedInUser;
