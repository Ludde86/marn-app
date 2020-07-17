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
