'use strict';

var React = require('react-native');
var nextPage = require('./nextPage');
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

	render: function() {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderList}
            style={styles1.listView}/>
        );
      },
      onTouch:function(data){
        this.props.navRef.push({
          title: data,
          component: nextPage,
          passProps: {title: 'data',
                  content: data,}
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

var styles1 = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height:100,
        borderBottomWidth:0.5,
      },
      title: {
        fontSize: 20,
        textAlign: 'center',
      },
      listView: {
        backgroundColor: '#F5FCFF',
      },
    });

module.exports = Hello;