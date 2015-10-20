'use strict';

var _ = require('underscore');
var Color = require('color');
var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var {
	// TODO: adapt for android
	AlertIOS,
	StyleSheet,
	Dimensions,
	View,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	Image,
} = React;

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var su = require('./styleUtils');
var api = require('./api');
var {
	user,
	sms
} = api;

var SMS_COOLDOWN = 60;

var SignUpView = React.createClass({
	mixins: [TimerMixin],

	getInitialState: function() {
		return {
			smsCoolDown: 0,
			phone: '',
			code: '',
			password: ''
		}
	},

	_sendVerifyCode: function() {
		var phoneValidator = /^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
		if (!phoneValidator.test(this.state.phone)) {
			return AlertIOS.alert('请填写正确的手机号码');
		}

		sms.requestSmsCode(this.state.phone).catch(function(e) {
			console.trace(e);
		}).finally(function() {
			this.setState({
				smsStamp: Date.now(),
				smsCoolDown: SMS_COOLDOWN
			}, function() {
				this.setTimeout(this._smsCoolDown, 300);
			}.bind(this));
		}.bind(this));
	},

	_smsCoolDown: function() {
		var duration = Math.floor((Date.now() - this.state.smsStamp) / 1000);
		if (duration >= SMS_COOLDOWN) {
			this.setState({
				smsStamp: null,
				smsCoolDown: 0
			});
		} else {
			this.setState({
				smsCoolDown: SMS_COOLDOWN - duration
			});
			this.setTimeout(this._smsCoolDown, 300);
		}
	},

	_siginup: function() {
		var labels = {
			phone: '手机号',
			password: '密码',
			code: '验证码'
		};
		var key = _.find(['phone', 'code', 'password'], function(key) {
			return !this.state[key];
		}, this);

		if (key) {
			return AlertIOS.alert('请填写' + labels[key]);
		}

		sms.verifySmsCode(this.state.phone, this.state.code).then(function(verified) {
			if (!verified) {
				return AlertIOS.alert('验证码不正确');
			}

			user.signup(this.state.phone, this.state.password).then(function() {
				AlertIOS.alert('注册成功', null, [{
					text: '确定',
					onPress: function() {
						this.props.navigator.resetTo({
							title: '活动',
						    name: 'main'
						});
					}.bind(this)
				}]);
			}.bind(this), function(e) {
				console.trace(e);
				AlertIOS.alert(e.reason);
			});
		}.bind(this));
	},

	_renderSmsButton: function() {
		if (this.state.smsCoolDown) {
			return (
				<View style={styles.verifyCodeButtonWrap}>
					<TouchableOpacity activeOpacity={1}>
						<Text style={[styles.verifyCodeButton, styles.verifyCodeButtonDisabled]}>
							{"获取验证码(" + this.state.smsCoolDown+ ")"}
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={styles.verifyCodeButtonWrap}>
					<TouchableOpacity onPress={this._sendVerifyCode}>
						<Text style={styles.verifyCodeButton}>获取验证码</Text>
					</TouchableOpacity>
				</View>
			);
		}
	},

	render: function() {
		return (
			<View style={[styles.container, this.props.style]}>
				<View style={styles.signupForm}>
					<View style={styles.inputWrap}>
						<Text style={styles.label}>手机号</Text>
						<TextInput 
							style={[styles.input, styles.inputPhone]}
							onChangeText={(phone) => this.setState({phone})}/>
						{this._renderSmsButton()}
					</View>

					<View style={[styles.inputWrap, styles.inputSeparator]}/>

					<View style={styles.inputWrap}>
						<Text style={styles.label}>验证码</Text>
						<TextInput 
							style={styles.input}
							value={this.state.code}
							onChangeText={(code) => this.setState({code})}/>
					</View>

					<View style={[styles.inputWrap, styles.inputSeparator]}/>

					<View style={styles.inputWrap}>
						<Text style={styles.label}>密码</Text>
						<TextInput 
							secureTextEntry={true} 
							style={styles.input}
							value={this.state.password}
							onChangeText={(password) => this.setState({password})}/>
					</View>
				</View>

				<View style={styles.signupButtonWrap}>
					<TouchableHighlight onPress={this._siginup} underlayColor='transparent'>
						<Text style={styles.signupButton}>注册</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f3f5f6'
	},
	
	signupForm: {
		marginTop: 20,
		borderTopWidth: 1,
		borderTopColor: '#dbe0e3',
		borderBottomWidth: 1,
		borderBottomColor: '#dbe0e3',
		backgroundColor: '#fff',
	},

	signupButtonWrap: {
		...su.padding(20, 15)
	},

	signupButton: {
		overflow: 'hidden',
		textAlign: 'center',
		backgroundColor: '#0087fa',
		borderRadius: 6,
		fontSize: 17,
		color: '#fff',
		...su.padding(14, 0)
	},

	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15
	},

	label: {
		fontSize: 14,
		color: '#737373',
		backgroundColor: '#fff',
		width: 60
	},

	input: {
		flex: 2,
		color: '#303030',
		height: 44,
		fontSize: 14,
		backgroundColor: '#fff'
	},

	verifyCodeButtonWrap: {
		height: 44,
		width: 110,
		justifyContent: 'center',
		borderLeftWidth: 1,
		borderLeftColor: '#dbe0e3'
	},

	verifyCodeButton: {
		textAlign: 'center',
		fontSize: 12,
		color: '#0087fa',
	},

	verifyCodeButtonDisabled: {
		color: Color('#0087fa').lighten(0.3).hexString(),
	},

	inputSeparator: {
		height: 1,
		backgroundColor: '#dbe0e3'
	},
});

module.exports = SignUpView;
