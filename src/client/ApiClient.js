const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8080/api';

function ApiClient() {}

ApiClient.prototype.getAllRestaurants = () => {
	return axios.get(`/restaurant`, {
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response && response.data;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.login = (username, password) => {
	const params = {
		'contactNumber': username,
		'password': password
	};
	return axios.post('/user/login', null, {
			params,
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			console.log(" login response --> ", response);
			return response;
		}).catch((error) => {
			throw error;
		});
}

ApiClient.prototype.signup = (firstName, lastName, email, contactNumber, password) => {
	const params = {
		firstName, lastName, email, contactNumber, password
	};
	return axios.post('/user/signup', null, {
			params,
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			console.log(" signup response --> ", response);
			return response;
		}).catch((error) => {
			throw error;
		});
}

export default ApiClient;