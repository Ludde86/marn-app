// check to see if a token is passed in, if it is we gonna set it to a global (default) header,
// -> if not, we gonna delete it from the global header

import axios from 'axios';

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
