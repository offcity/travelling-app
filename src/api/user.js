var React = require('react-native');
var NativeModules = React.NativeModules;
var UserApi = NativeModules.UserApi;

function currentUser() {
	return new Promise(function(resolve, reject) {
		UserApi.currentUser(function(e, user) {
			if (e) {
				reject(e);
			} else {
				resolve(user);
			}
		});
	});
}

function signup(phone, password) {
	return new Promise(function(resolve, reject) {
		UserApi.signup(phone, password, function(e, user) {
			if (e) {
				reject(e);
			} else {
				resolve(user);
			}
		});
	});
}

function signin(phone, password) {
	return new Promise(function(resolve, reject) {
		UserApi.signin(phone, password, function(e, user) {
			if (e) {
				reject(e);
			} else {
				resolve(user);
			}
		});
	});
}

function logout() {
	return new Promise(function(resolve, reject) {
		UserApi.logout(function(e) {
			if (e) {
				reject(e);
			} else {
				resolve();
			}
		});
	});
}

module.exports = {
	currentUser,
	signup,
	signin,
	logout
};
