'use strict';

var React = require('react-native');
var AppRegistry = React.AppRegistry;

var Home = require('./Root');
var config = require('./src/config');
config.platform = 'ios';

AppRegistry.registerComponent('AwesomeProject', () => Home);
