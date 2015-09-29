'use strict';

var React = require('react-native');
// var AV = require('avoscloud-sdk').AV;
// AV.initialize('vGdoWipkgLukG49FCz6beS1D', '5LubapRJJIphAkmklcQw8zx2');
var AppRegistry = React.AppRegistry;

var Root = require('./Root');
var Activity = require('./Activity');

AppRegistry.registerComponent('Root', () => Root);

