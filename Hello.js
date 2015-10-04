'use strict';

var React = require('react-native');
var NextPage = require('./NextPage');
var {
  RefresherListView,
  LoadingBarIndicator
} = require('react-native-refresher');
var {
  AppRegistry,
  StyleSheet,
  Text,
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
            <View style={style.container}>
                <TouchableHighlight onPress={this.handlePress} underlayColor="#efefef">
                    <Text style={style.button}>{this.props.children}</Text>
                </TouchableHighlight>
            </View>
        );
    }
});

var Hello = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
		};
	},

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch("https://api.leancloud.cn/1.1/classes/Post", {
            headers: {
                'Content-Type': 'application/json',
                'X-LC-Id': 'vGdoWipkgLukG49FCz6beS1D',
                'X-LC-Key': '5LubapRJJIphAkmklcQw8zx2',
            }
        }).then(function(response) {
            var data = JSON.parse(response._bodyInit);

            var dataSource = this.state.dataSource.cloneWithRows(data.results);
            //console.error(dataSource);
            this.setState({
                dataSource: dataSource,
                loaded: true,
            });
            //console.error("123");
        }.bind(this), function() {
            console.error("fail");
        });
  },

  addItem: function() {
        fetch("https://api.leancloud.cn/1.1/classes/Post", {
            method: "POST",
            headers: {
                'X-LC-Id': 'vGdoWipkgLukG49FCz6beS1D',
                'X-LC-Key': '5LubapRJJIphAkmklcQw8zx2',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: "hello",
                id: Math.ceil(Math.random() * 10000)
            })
        }).then(function() {
            this.fetchData();
        }.bind(this), function() {
            console.error("fail");
        });
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
          <View style={style.rootContainer}>
          {this.renderHeader('游记')}
          <View>
          <Button onClick={this.addItem} style={styles1.toolbar}>添加</Button>
          </View>
          <RefresherListView
            dataSource={this.state.dataSource}
            renderRow={this.renderList}
            onRefresh={this.onRefresh}
            minTime={50}
            style={styles1.listView}/>
          </View>
        );
      },

  onRefresh: function() {
    // You can either return a promise or a callback
    this.fetchData();
  },
      onTouch:function(data){
        this.props.navigator.push({
          name: 'NextPage',
          index: 1,
          id: data.id,
          content: data.content,
          component: NextPage,
        });
      },
      renderList: function(data) {
        return (
          <TouchableHighlight onPress={() => this.onTouch(data)} underlayColor="#efefef">
          <View style={styles1.container}>
              <Text style={styles1.title}>{data.id}#{data.content}</Text>
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
        height:50,
        borderBottomWidth:0.5,
      },

      toolbar: {
        backgroundColor: '#F5FCFF',
        height: 50
      },

      title: {
        fontSize: 20,
        textAlign: 'center',
      },
      listView: {
        flex: 1,
        backgroundColor: 'white',
      },
    });

module.exports = Hello;