'use strict';

var _ = require('underscore');
var React = require('react-native');
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
  Image
} = React;

var {user} = require('./api');

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var su = require('./styleUtils');

var SignInView = React.createClass({

	getInitialState: function() {
		return {
			phone: '',
			password: ''
		}
	},

	_signinByWechat: function() {
		// TODO: implement wechat signin
	},

	_signin: function() {
		var labels = {
			phone: '手机号',
			password: '密码',
		};
		var key = _.find(['phone', 'password'], function(key) {
			return !this.state[key];
		}, this);

		if (key) {
			return AlertIOS.alert('请填写' + labels[key]);
		}

		var phoneValidator = /^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
		if (!phoneValidator.test(this.state.phone)) {
			return AlertIOS.alert('请填写正确的手机号码');
		}

		user.signin(this.state.phone, this.state.password).then(function() {
			this.props.navigator.resetTo({
				title: '活动',
				name: 'main'
			});
		}.bind(this), function(e) {
			console.trace(e);
			return AlertIOS.alert(e.reason || '登录失败');
		});
	},

	_signup: function() {
		this.props.navigator.push({
			name: 'signup',
			title: '注册'
		});
	},

	_forgetPassword: function() {
		// TODO: implement password reseting
	},

	render: function() {
		return (
			<Image source={require('image!signin-bg')} style={[styles.container, this.props.style]}>
				<View style={styles.signinForm}>
					<View style={styles.inputWrap}>
						<Image source={require('image!user-icon')} style={styles.inputIcon}/>
						<TextInput placeholder='输入手机号' 
							style={[styles.input, styles.inputPhone]}
							onChangeText={(phone) => this.setState({phone})}/>
					</View>

					<View style={[styles.inputWrap, styles.inputSeparator]}/>

					<View style={styles.inputWrap}>
						<Image source={require('image!password-icon')} style={styles.inputIcon}/>
						<TextInput placeholder='输入密码'
							style={styles.input}
							secureTextEntry={true} 
							value={this.state.password}
							onChangeText={(password) => this.setState({password})}/>
					</View>
				</View>

				<View style={styles.signinButtonWrap}>
					<TouchableHighlight onPress={this._signin} underlayColor='transparent'>
						<Text style={styles.signinButton}>登录</Text>
					</TouchableHighlight>
				</View>

				<View style={styles.links}>
					<TouchableOpacity onPress={this._forgetPassword}>
						<Text style={[styles.link, styles.forget]}>忘记密码?</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._signup}>
						<Text style={[styles.link, styles.signup]}>快速注册</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.wechatWrap}>
					<TouchableOpacity onPress={this._signInByWechat} activeOpacity={0.8}>
						<Image source={require('image!wechat-icon')} style={styles.wechatIcon}/>
					</TouchableOpacity>
					<Text style={styles.wechatTip}>使用微信账号登录</Text>
				</View>
			</Image>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		// TODO: full screen hack!
		...su.size(deviceWidth, deviceHeight)
	},
	
	signinForm: {
		marginTop: 20,
		backgroundColor: '#fff',
	},

	signinButtonWrap: {
		...su.padding(20, 15)
	},

	signinButton: {
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
		...su.margin(0, 15)
	},

	inputIcon: {
		...su.padding(0, 15),
		...su.size(16),
		resizeMode: 'contain'
	},

	input: {
		flex: 1,
		height: 44,
		fontSize: 14,
		backgroundColor: '#fff'
	},

	inputSeparator: {
		height: 1,
		backgroundColor: '#EEE'
	},
	
	wechatWrap: {
		position: 'absolute',
		alignItems: 'center',
		bottom: 40,
		left: 0,
		right: 0
	},

	wechatIcon: {
		...su.size(64),
	},

	wechatTip: {
		marginTop: 20,
		color: '#fff',
		fontSize: 14,
		textAlign: 'center'
	},

	links: {
		...su.margin(0, 25)
	},

	link: {
		fontSize: 17
	},

	forget: {
		color: '#737373',
		position: 'absolute',
		left: 0
	},

	signup: {
		color: '#0087fa',
		position: 'absolute',
		right: 0
	}
});

module.exports = SignInView;
