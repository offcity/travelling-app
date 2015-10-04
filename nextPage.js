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
                <TouchableHighlight onPress={this.handlePress} underlayColor="#1965d8">
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
            传递过来的参数
          </Text>
          <Image
            style={styles.logo}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
          <Text style={styles.description}>
            route: {this.props.route}
          </Text>
          <Text style={styles.description}>
            id: {this.props.route.id}
          </Text>
          <Text style={styles.description}>
            title: {this.props.route.title}
          </Text>
          <Text style={styles.description}>
            content: {this.props.route.content}
          </Text>
          <Text style={styles.description}>
            name: {this.props.route.name}
          </Text>
        </View>
      </View>
    );
  },
});

var styleHeader = require("./style");

var styles = StyleSheet.create({

  logo: {
    width: 200,
    height: 100,
  },

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