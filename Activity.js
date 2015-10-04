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

var Activity = React.createClass({
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
    fetch("https://api.leancloud.cn/1.1/classes/Activity", {
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
          {this.renderHeader('活动')}
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
      title: data.title,
      content: data.content,
      component: NextPage,
    });
  },
  renderList: function(data) {
    return (
      <TouchableHighlight onPress={() => this.onTouch(data)} underlayColor="#efefef">
      <View style={styles1.container}>
        <Image
            style={styles1.logo}
            source={{uri: 'https://placeholdit.imgix.net/~text?txtsize=38&bg=cccccc&txtclr=ffffff&txt=img&w=400&h=150&txttrack=0'}}/>
        <View style={styles1.img}>
          <Text style={styles1.imgText}>{data.title}</Text>
          <Text style={styles1.placeText}>火热报名中 3-5车成行 行程容易</Text>
        </View>
        <View style={styles1.place}>
          <Text style={styles1.placeText}>{data.content}</Text>
        </View>
        <View style={styles1.dateRange}>
          <Text style={styles1.dateRangeText}>09月01日 - 09月10日（10天9晚）</Text>
        </View>
        <View style={styles1.user}>
          <Text style={styles1.userText}>Steven 发布于2015-08-02 13:48</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

});

var style = require("./style");

var styles1 = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height:200,
        borderBottomWidth:0.5,
      },

      img: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      },

      logo: {
        flex: 1, 
        height: 140, 
        width: 375,
        position: 'absolute',
        flex: 1,
        alignItems: 'stretch'
      },

      imgText: {
        paddingLeft: 16,
        fontSize: 20,
        color: 'white',
      },

      placeText: {
        paddingLeft: 16,
        paddingBottom: 6,
        color: '#666',
      },

      dateRangeText: {
        paddingLeft: 16,
        color: '#666',
      },

      user: {
        paddingBottom: 6,
      },

      userText: {
        paddingLeft: 16,
        color: '#666',
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

module.exports = Activity;