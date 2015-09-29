'use strict';

var React = require('react-native');
var NextPage = require('./NextPage');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  ListView,
} = React;

var Hello = React.createClass({
	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var arr = [];
		var str = 'row';
		for (var i = 0; i < 100; i++) {
			arr.push(str+" "+i);
		};
		return {
			dataSource: ds.cloneWithRows(arr),
		};
	},

  renderHeader: function(title) {
    return (
      <View style={style.headerContainer}>
        <Text style={style.header}>{title}</Text>
      </View>
    )
  },

	render: function() {
        return (
          <View>
          {this.renderHeader('朋友')}
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderList}
            style={styles1.listView}/>
          </View>
        );
      },
      onTouch:function(data){
        this.props.navigator.push({
          name: 'NextPage',
          index: 1,
          passProps: 'test',
        });
      },
      renderList: function(data) {
        return (
          <TouchableHighlight onPress={() => this.onTouch(data)}>
          <View style={styles1.container}>
              <Text style={styles1.title}>{data}</Text>
          </View>
          </TouchableHighlight>
        );
      },

});

var style = require("./style");

var styles1 = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:100,
        borderBottomWidth:0.5,
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
      },
      listView: {
      },
    });

module.exports = Hello;