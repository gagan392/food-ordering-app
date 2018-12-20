const axios = require('axios');
const baseURL = 'http://localhost:8080/api';

function ApiClient() {}

ApiClient.prototype.getAllRestaurants = () => {
	return axios.get(`${baseURL}/restaurant`, {
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

ApiClient.prototype.getRestauratsByName = (restaurantName) => {
	return axios.get(`${baseURL}/restaurant/name/${restaurantName}`, {
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

ApiClient.prototype.getRestauratsById = (restaurantId) => {
	return axios.get(`${baseURL}/restaurant/${restaurantId}`, {
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
	return axios.post(`${baseURL}/user/login`, null, {
			params,
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response;
		}).catch((error) => {
			return error.response;
		});
}

ApiClient.prototype.signup = (firstName, lastName, email, contactNumber, password) => {
	const params = {
		firstName, lastName, email, contactNumber, password
	};
	return axios.post(`${baseURL}/user/signup`, null, {
			params,
			headers: {
				"Accept": "application/json",
				"content-type": "application/json"
			}
		})
		.then(response => {
			return response;
		}).catch((error) => {
			throw error;
		});
}

export default ApiClient;