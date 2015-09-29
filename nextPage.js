'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} = React;

var Button = React.createClass({
    handlePress: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.handlePress}>
                    <Text style={styles.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var NextPage = React.createClass({
  onBack: function() {
        this.props.navigator.pop();
    },

  renderHeader: function(title) {
    return (
      <View style={styleHeader.headerContainer}>
        <Button style={styles.headerBtn} onClick={this.onBack}>返回</Button>
        <Text style={styles.header}>{title}</Text>
      </View>
    )
  },

  render: function() {
    return (
     
      <View style={styleHeader.rootContainer}>
      {this.renderHeader('详情')}
        <View>
          <Text style={styles.description}>
            {this.props.name}
          </Text>
          <Button onClick={this.onBack}>back</Button>
          <Text style={styles.description}>
            {this.props.title}
          </Text>
          <Text style={styles.description}>
            {this.props.content}
          </Text>
        </View>
      </View>
    );
  },
});

var styleHeader = require("./style");

var styles = StyleSheet.create({

  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    alignItems: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
    margin: 120,
  },
  button: {
    flex: 2,
    margin: 10,
    flexDirection: 'row',
    color: 'white',
  },
});

module.exports = NextPage;