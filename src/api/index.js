var moment = require('moment');
var user = require('./user');

var commonHeaders = {
	'X-LC-Id': '5jqgy6q659ljyldiik70cev6d8n7t1ixolt6rd7k6p1n964d',
	'X-LC-Key': 'bm0vszz9zd521yw8l40k6wdh6vsqq5aht92fdohlgzvwrgl4',
	'Content-Type': 'application/json'
}

var sms = {
	requestSmsCode: function(phone) {
		// TODO: implement sms api
		return new Promise(function(resolve, reject) {
			resolve();
		});

		// return fetch('https://leancloud.cn/1.1/requestSmsCode', {
		// 	method: 'post',
		// 	headers: commonHeaders,
		// 	body: JSON.stringify({
		// 		mobilePhoneNumber: phone
		// 	})
		// }).then(function(response) {
		// 	var data = JSON.parse(response._bodyInit);
		// 	if (response.status === 200) {
		// 		return data;
		// 	} else {
		// 		var e = Error('ERROR ' + data.code + ' ' + data.error);
		// 		e.response = response;
		// 		e.data = data;
		// 		throw e;
		// 	}
		// });
	},

	verifySmsCode: function(phone, code) {
		// TODO: implement sms api
		return new Promise(function(resolve, reject) {
			resolve(code == '123456');
		});

		// var url = 'https://leancloud.cn/1.1/requestSmsCode/' + code + '?mobilePhoneNumber=' + phone;
		// return fetch(url, {
		// 	method: 'post',
		// 	headers: commonHeaders
		// }).then(function(response) {
		// 	// return response.status === 200;
		// 	return code == '123456';
		// }, function() {
		// 	// return false;
		// 	return code == '123456';
		// });
	}
};

var activity = {
	PREPARING: 'preparing',
	TRAVELLING: 'travelling',

	fetch: function() {
		// TOOD: implement activity query api

		return new Promise(function(resolve, reject) {
			var publishDate = moment('2015-10-08 12:00').toDate();
			var startDate = moment('2015-10-09').toDate();
			var endDate = moment('2015-10-12').toDate();
			console.log(publishDate, startDate, endDate);

			setTimeout(function() {
				resolve({
					results: [{
						id: 1,
						header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
						title: 'GO！一起去草原撒野',
						status: 'preparing',
						tags: ['3-5车同行', '行程容易'],
						route: '北京 - 天津 - 石家庄',
						startDate: startDate,
						endDate: endDate,
						publishDate: publishDate,
						user: {
							username: 'Steven'
						},
						stars: 299
					}, {
						id: 2,
						header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
						title: 'GO！一起去草原撒野',
						status: 'travelling',
						tags: ['3-5车同行', '行程容易'],
						route: '北京 - 天津 - 石家庄',
						startDate: startDate,
						endDate: endDate,
						publishDate: publishDate,
						user: {
							username: 'Steven'
						},
						stars: 299
					}, {
						id: 3,
						header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
						title: 'GO！一起去草原撒野',
						status: 'preparing',
						tags: ['3-5车同行', '行程容易'],
						route: '北京 - 天津 - 石家庄',
						startDate: startDate,
						endDate: endDate,
						publishDate: publishDate,
						user: {
							username: 'Steven'
						},
						stars: 299
					}]
				});
			}, 1000);
		});

		// return fetch("https://api.leancloud.cn/1.1/classes/Activity", {
		//           headers: commonHeaders
		//       }).then(function(response) {
		//           var data = JSON.parse(response._bodyInit);

		//           if (response.status === 200) {
		//           	return data
		//           } else {
		//           	var e = Error('ERROR ' + data.code + ' ' + data.error);
		// 		e.response = response;
		// 		e.data = data;
		// 		throw e;
		//           }
		//       });
	},
};

var journey = {
	fetch: function() {
		return new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve({
					results: [{
						id: 1,
						header: 'http://f.hiphotos.baidu.com/image/pic/item/b64543a98226cffc9b70f24dba014a90f703eaf3.jpg',
						title: '最美的时光在路上',
						views: 1321,
						stars: 21,
						publishDate: Date.now(),
						user: {
							username: 'Steven'
						}
					}]
				});
			}, 1000);
		});
	}
};

module.exports = {
	user,
	sms,
	activity
};