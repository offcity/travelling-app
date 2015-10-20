'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var su = require('../styleUtils');

var Button = React.createClass({
	propTypes: function () {
		style: View.propTypes.styles
	},

    render: function () {
        return (
        	<TouchableHighlight onPress={this.props.onPress}>
            	<Text style={[styles.base, this.props.style]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({

	base: {
		...su.padding(10, 24),
		color: '#fff',
		fontSize: 20,
	}
});

module.exports = Button;
