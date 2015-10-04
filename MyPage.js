'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableHighlight,
  ListView,
} = React;

var Button = React.createClass({
    handlePress: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <View style={styleHeader.container}>
                <TouchableHighlight onPress={this.handlePress} underlayColor="#efefef">
                    <Text style={styleHeader.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var MyPage = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      title: 0,
      content: 0,
		};
	},

	render: function() {
    return (
      <View style={style.rootContainer}>
      <View>
        <Text>活动标题：</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({title:text})}
          value={this.state.title}/>
        <Text>活动内容：</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({content:text})}
          value={this.state.content}/>
      </View>
      </View>
    );
  },

});

var style = require("./style");

var styleHeader = require("./styleHeader");

module.exports = MyPage;